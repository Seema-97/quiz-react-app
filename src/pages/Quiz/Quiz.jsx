import React, { Fragment, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";
import "./Quiz.css";

let LS = "credentials";
let localData = JSON.parse(localStorage.getItem(LS));

// console.log(localData);

const Quiz = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [takeQuiz, setTakeQuiz] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState([]);
  const [googleUserData, setGoogleUserData] = useState({});

  useEffect(() => {
    if (localData) {
      setIsLoggedIn(true);
      handleGetQuestions();
    }
  }, []);

  const handleOptions = (e, item, index) => {
    const newAnswer = {
      questionID: item.id,
      questionNum: index + 1,
      question: item.info.question,
      givenAnswer: e.target.value,
      correctAnswer: item.info.answer,
      correctOrIncorrect:
        e.target.value === item.info.answer ? "correct" : "incorrect",
    };

    setUserAnswers((prev) => {
      let updatedAnswers = prev.filter(
        (answer) => answer.questionID !== item.id
      );
      updatedAnswers.push(newAnswer);
      return updatedAnswers;
    });
  };

  // console.log(userAnswers) ;

  const handleSubmit = async () => {
    await addDoc(collection(FIRESTORE, "userAnswers"), {
      userAnswers,
    })
      .then(() => {
        alert("your answers are submitted") ;

      }
    )
      .catch((err) => console.log(err));

    handleGetUserAnswers();
  };

  const handleGetUserAnswers = async () => {
    const response = await getDocs(collection(FIRESTORE, "userAnswers"));
    let temp = [];
    console.log(response);
    response.forEach((doc) => {
      let data = {
        id: doc.id,
        info: doc.data(),
      };

      temp.push(data);
    });
    
    setShowAnswer(temp)
  };

  // console.log(showAnswer);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleSignInOnClick = async () => {
    onAuthStateChanged(auth, async (res) => {
      if (res) {
        let data = {
          userName: res.displayName,
          userEmail: res.email,
        };

        localStorage.setItem(LS, JSON.stringify(data));
        setIsLoggedIn(true);
        setGoogleUserData(data);
        setTakeQuiz(true);
      } else {
        signInWithPopup(auth, provider)
          .then((result) => {
            let data = {
              userName: result.user.displayName,
              userEmail: result.user.email,
            };

            addDoc(collection(FIRESTORE, "googleUsers"), {
              ...data,
            })
              .then(() => alert("You are logged in"))
              .catch((err) => console.log(err));

            localStorage.setItem(LS, JSON.stringify(data));
            setIsLoggedIn(true);
            setGoogleUserData(data);
            setTakeQuiz(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleGetQuestions = async () => {
    const response = await getDocs(collection(FIRESTORE, "QuizQuestions"));
    let temp = [];
    response.forEach((doc) => {
      let data = {
        id: doc.id,
        info: doc.data(),
      };
      temp.push(data);
      setQuestionData(temp);
      setTakeQuiz(false);
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem(LS);
    setQuestionData(null);
    setGoogleUserData({});
    setIsLoggedIn(false);
  };

  // console.log(googleUserData) ;

  return (
    <>
      <div className="quiz-container">
        <div>Quiz</div>

        {isLoggedIn ? (
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleLogOut}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSignInOnClick}
          >
            Login
          </button>
        )}

        {takeQuiz ? (
          <button className="btn btn-primary" onClick={handleGetQuestions}>
            Take a Quiz
          </button>
        ) : (
          ""
        )}

        {questionData?.map((item, index) => (
          <div key={item.id} className="card">
            <p>
              {index + 1}. {item.info.question}
            </p>
            <div>
              <p>
                <input
                  type="radio"
                  name={`options-${item.id}`}
                  onChange={(e) => {
                    handleOptions(e, item, index);
                  }}
                  value="a"
                />
                a.{item.info.a}
              </p>
              <p>
                <input
                  type="radio"
                  name={`options-${item.id}`}
                  onChange={(e) => {
                    handleOptions(e, item, index);
                  }}
                  value="b"
                />
                b.{item.info.b}
              </p>
              <p>
                <input
                  type="radio"
                  name={`options-${item.id}`}
                  onChange={(e) => {
                    handleOptions(e, item, index);
                  }}
                  value="c"
                />
                c.{item.info.c}
              </p>
              <p>
                <input
                  type="radio"
                  name={`options-${item.id}`}
                  onChange={(e) => {
                    handleOptions(e, item);
                  }}
                  value="d"
                />
                d.{item.info.d}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="answer-container">
        <button onClick={handleSubmit} className="btn btn-success">
          Submit
        </button>


        {showAnswer.map((item, index) => (
          
           (index === showAnswer.length - 1 )?  (<>
              <Fragment key={item.id}>
              {item.info.userAnswers.map((item) => (
                <Fragment key={item.questionID}>
                  <div className="card">
                    <p>Question Number :{item.questionNum}</p>
                    <p>Correct Answer :{item.correctAnswer}</p>
                    <p>Your Answer:{item.givenAnswer}</p>
                    <p style={{color:'blue'}}>Correct or incorrect :{item.correctOrIncorrect}</p>
                  </div>
                </Fragment>
              ))}
            </Fragment>
            </>) : '' 
           
          // <Fragment key={item.id}>
          //      {item.info.userAnswers.map((item) => (
          //       <Fragment key={item.questionID}>
          //         <div className="card">
          //           <p>Question Number :{item.questionNum}</p>
          //           <p>Correct Answer :{item.correctAnswer}</p>
          //           <p>Your Answer:{item.givenAnswer}</p>
          //           <p style={{color:'blue'}}>Correct or incorrect :{item.correctOrIncorrect}</p>
          //         </div>
          //       </Fragment>
          //     ))}
          //   </Fragment>
       

        ))}
      </div>
    </>
  );
};

export default Quiz;
