import { collection, getDocs } from 'firebase/firestore'
import React, { createContext, useContext, useState } from 'react'
import { FIRESTORE } from '../firebase.config'

 const myContext = createContext()

 export const useMyContext = () =>{
     return useContext(myContext)
 }

 const ContextProvider = ({children} ) => {
  // console.log(children)
  const [googleUserData, setGoogleUserData ] = useState({})
  const [questionData, setQuestionData] = useState(null);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const[quizStarted , setIsQuizStarted] = useState(false);
  const[isAttemptVisible,setIsAttemptVisible ] = useState(false)

  const getQuestions = async () => {
    const response = await getDocs(collection(FIRESTORE, "QuizQuestions"));
    let temp = [];
    response.forEach((doc) => {
      let data = {
        id: doc.id,
        info: doc.data(),
      };
      temp.push(data);
    });
    setQuestionData(temp);
  };

  return (
      <myContext.Provider value={{ googleUserData, setGoogleUserData, questionData ,setQuestionData,isloggedIn,
        setIsLoggedIn , getQuestions , quizStarted , setIsQuizStarted ,isAttemptVisible,setIsAttemptVisible  }}>
          {children}
      </myContext.Provider>
  )
}


export default ContextProvider
