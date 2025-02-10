import { useEffect, useState } from "react";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, FIRESTORE } from "../../firebase.config";
import "./Home.css";
import ResultsCard from "../../components/ResultsCard/ResultsCard";
import { useMyContext } from "../../context/ContextProvider";



const abcd = ['a','b' ,'c','d']

const Home = () => { 
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAttempts, setShowAttempts] = useState([]);
  const[timeLeft , setTimeLeft ] = useState(null);
  const[isTimerRunning , setIsTimerRunning] = useState(false);

  let localData = JSON.parse(localStorage.getItem('credentials'))

  const useMyContextValue = useMyContext()
  const{ questionData,isloggedIn ,
    setIsLoggedIn , getQuestions ,quizStarted , setIsQuizStarted , isAttemptVisible,setIsAttemptVisible } =useMyContextValue

  useEffect(() => { 
        if(localData){
          // console.log(localData)
          setIsLoggedIn(true);
          getQuestions();
          getUserAttempts();
        } 
      }    
  , [localData]);

   console.log('home page rendering')

  const handleOptions = (e, item, index) => {
    
    const newQuestion = {
      questionID: item.id,
      questionNum: index + 1,
      question: item.info.question,
      givenAnswer: e.target.value,
      correctAnswer: item.info.answer,
      correctOrIncorrect: e.target.value === item.info.answer ? "correct" : "incorrect",
  }
    setUserAnswers((prev) => {
      const updatedPrev = prev.filter(elem => elem.questionID != item.id)
      return[...updatedPrev , newQuestion]
    }
     
    )}

  //  console.log(userAnswers)

  const handleSubmit = async () => {
    try{
      await addDoc(collection(FIRESTORE, "userAnswers"), {
        uid: localData?.uid,
        userAnswers,  
      })

      alert('your answers are submitted')
    }
    catch(error){
       console.log(error)
    }
    getUserAttempts();
    setIsTimerRunning(false)
    
  };

  const getUserAttempts = async () => {
    const response = await getDocs(collection(FIRESTORE, "userAnswers"));
    let temp = [];
    // console.log(response);
    response.forEach((doc) => {
      let data = {
        id: doc.id,
        info: doc.data(),
      };

      // console.log("Comparing UID:", data?.info?.uid, "with localData UID:", localData?.uid);
      if (data?.info?.uid === localData?.uid) {
        temp.push(data);
      }
    });

    setShowAttempts(temp)
  };

  // console.log(showAttempts);

  const handleQuizPlayingBtn = () => {
    setIsQuizStarted(true);
    startTimer()
  }

  const startTimer = () =>{
    setTimeLeft(60)
    setIsTimerRunning(true);
  }

  useEffect(() => {
    let timerInterval ;

    if(isTimerRunning && timeLeft >0){
      timerInterval = setInterval(() => {
         setTimeLeft(prev => prev-1)
      } , 1000)
    }

    if(timeLeft <=0){
      setIsTimerRunning(false)
      clearInterval(timerInterval)
    }

    return () => clearInterval(timerInterval);  // Cleanup function: clear the interval whenever the effect reruns or the component unmounts

  } ,[isTimerRunning,timeLeft])

  const formatTime = (seconds) =>{
      const minutes = Math.floor(seconds/60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;  
  }


  return (
    <>
      <div className="quiz-page-container">            
       {
        (isloggedIn ) ? <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , gap:'30px'}}> 
           {timeLeft > 0  ? '':  <button onClick={handleQuizPlayingBtn} className="btn btn-success mt-5" >Start Playing</button> }
           {timeLeft !== null && <div className="timer">{formatTime(timeLeft)}</div>}
           {quizStarted ?
          (isTimerRunning && timeLeft >0) ?
            <>
          <div className="quiz-container">
        {questionData?.map((item, index) => (
           <div key={item.id} className="question-card">
             <p className="question">
               {index + 1}. {item.info.question}
             </p>
             <div>
                 {abcd.map(option => (
                   <div key={option} >
                     <input
                   type="radio"
                   name={`options-${item.id}`}
                   onChange={(e) => {
                     handleOptions(e, item, index);
                   }}
                   value={option}
                 />
                   <span style={{marginLeft:'5px'}}>{option}.{item.info[option]} </span>
                 {/* item.info[option] allows you to search for the value of option dynamically, while item.info.option searches for a property literally named option. */}
                   </div>
                 ))}
             </div>
           </div> 
         ))}
         </div> 

          <div style={{textAlign:'center'}}>
          <button onClick={handleSubmit} className="btn btn-success">
            Submit
          </button>
          </div>
         </> :        
         <div style={{textAlign:'center'}}>
          <div>
           {timeLeft > 0 ? <div><p>Quiz Completed !!!</p> <button onClick={handleQuizPlayingBtn} className="btn btn-success mt-5">Play Again</button></div >: <p>Time is up</p>}
          <button onClick={() => {setIsAttemptVisible(!isAttemptVisible)}} className="show-attempt-btn">{isAttemptVisible ? 'close Attempts' :'Show all my attemps'}</button>
          </div>
         </div>  : <div className="answer-container">
          <button onClick={() => {setIsAttemptVisible(!isAttemptVisible)}}  className="show-attempt-btn">{isAttemptVisible ? 'close Attempts' :'Show all my attemps'}</button >
          </div>      
         }
        
         {
          isAttemptVisible && <ResultsCard showAttempts={showAttempts} />
         }
        </div> : <div className="without-login-home-page"><p>Hii...please Login to start playing</p> </div>
       }
  
      </div>

    </>
  );
};

export default Home;
