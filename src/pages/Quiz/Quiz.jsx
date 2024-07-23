import React, { Fragment, useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider , onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";
import './Quiz.css'

let LS = 'credentials' ;
let localData = JSON.parse(localStorage.getItem(LS))

console.log(localData)

const Quiz = () => {

   const[isLoggedIn , setIsLoggedIn] = useState(false) ;
   const [questionData , setQuestionData] = useState(null) ;
   const[takeQuiz ,  setTakeQuiz] = useState(false)

   const[googleUserData , setGoogleUserData] = useState({}) ;

      useEffect( () => {
          if(localData){
            setIsLoggedIn(true) ;
            handleGetData();
          }
      } , []
      )
     

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
     
        const handleSignInOnClick = async() => {
          onAuthStateChanged(auth, async (res) => {
           
            if(res){
              let data = {
                userName : res.displayName ,
                userEmail : res.email
              }
            
              localStorage.setItem(LS , JSON.stringify(data)) 
              setIsLoggedIn(true) ;
              setGoogleUserData(data) ;
              setTakeQuiz(true) ;

            }
            
            else {
              signInWithPopup(auth, provider)
              .then((result) => {
                let data = {
                  userName : result.user.displayName ,
                  userEmail : result.user.email
                }

                addDoc(collection(FIRESTORE , 'googleUsers') , {
                  ...data
               }).then(() => alert('You are logged in'))
               .catch(err => console.log(err)) 


               localStorage.setItem(LS , JSON.stringify(data)) 
                setIsLoggedIn(true) ;
                setGoogleUserData(data) ;
                setTakeQuiz(true) ;
  
              }).catch((error) => {
                  console.log(error)
              });

           
            }
           
          })
          
            
        }

        const handleGetData = async () => {
            const response = await getDocs(collection(FIRESTORE, "QuizQuestions"));
            let temp = [];
            response.forEach((doc) => {
              let data = {
                id: doc.id,
                info: doc.data(),
              };
              temp.push(data);
              setQuestionData(temp) ;
              setTakeQuiz(false) ;
            });
          };

        const handleLogOut = () => {
          localStorage.removeItem(LS) ;
          setQuestionData(null) ;
          setGoogleUserData({}) ;
         setIsLoggedIn(false) ;
        }

        // console.log(googleUserData) ;


  return (
    <>
    <div className="quiz-container">
    <div>Quiz</div>

       {isLoggedIn ?  <button className="btn btn-primary" type="submit" onClick={handleLogOut}>
          Logout
        </button> :  <button className="btn btn-primary" type="submit" onClick={handleSignInOnClick}>
          Login
        </button>}

     {takeQuiz ? (<button className='btn btn-primary' onClick={handleGetData}>Take a Quiz</button> ) : ''}

     {questionData?.map((item,index) => (
        <div key={item.id} className='card'>
            <p>{index+1}. {item.info.question}</p>
            <div>
               <p><input type="radio"  name=''/>{item.info.a}</p>
               <p><input type="radio"  />{item.info.b}</p>
               <p><input type="radio"  />{item.info.c}</p>
               <p><input type="radio"  />{item.info.d}</p>
            </div>
        </div>
     ))}

     
     </div>
    </>
  )
}

export default Quiz