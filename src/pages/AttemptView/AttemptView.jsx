import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";

const AttemptView = () => {
    const { attemptID } = useParams();
    const [dataResponse, setDataResponse] = useState({});

    useEffect(() => {
        getdata().then(res => setDataResponse(res))
            .catch(err => console.log(err)
            )

    }, []);

    console.log(dataResponse);
    console.log(attemptID)
  

    async function getdata() {
        const docRef = doc(FIRESTORE, "userAnswers", attemptID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
            // console.log("Document data:", docSnap.data());
        } else {
            return {};
            // docSnap.data() will be undefined in this case
            // console.log("No such document!");
        }
        
    }

    console.log(getdata());

    return (
        <div>
            <h1>Attempt For {attemptID}</h1>
             <div className="container" >
             {dataResponse?.userAnswers?.map((item , index)=> (
                <Fragment key={item.questionID}>
                     <div className="card">
               <p>{index+1}. {item.question}</p>
                <p>Your Answer: {item.givenAnswer}</p>
                <p>Correct Answer: {item.correctAnswer}</p>
                 
                 <p style={{color : item.givenAnswer === item.correctAnswer  ? 'green' : 'red' }}>
                  {  item.givenAnswer === item.correctAnswer  ? "Your answer is Correct ": "your answer is Incorrect "}</p>
               </div>
                </Fragment>
             ))}
             </div>
        </div>
    )
}

export default AttemptView