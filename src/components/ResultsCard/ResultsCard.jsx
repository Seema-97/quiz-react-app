import { useNavigate } from "react-router-dom"
import Modal from "../Modal/Modal"
import { useState } from "react"


// eslint-disable-next-line react/prop-types
const ResultsCard = ({ showAnswer }) => {
   
//     let navigate = useNavigate()
//    const HandleAttemptDetails  = (item  , path) => {
//      console.log(item) ;
//      navigate(path);
//    }

const[attemptData , setAttemptData] = useState();
    
const handleAttemptButton = (item) => {
    console.log(item) ;
    setAttemptData(item) ;
}

// console.log(attemptData)

    return (
        <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
            {/* eslint-disable-next-line react/prop-types */}
            {showAnswer.map(item => (
                <div key={item.id} className="card" style={{ width: "16rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Quiz ID: {item?.id}</h5>
                     
           <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
            handleAttemptButton(item)
           }}>
               View Details
           </button>

           <Modal attemptData = {attemptData}/>


                    </div>
                </div>
            ))}
        </div>
    )
}

export default ResultsCard