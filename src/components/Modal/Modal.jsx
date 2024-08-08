import React, { Fragment } from 'react'

const Modal = ({attemptData}) => {
    if(attemptData) {
       console.log(attemptData.info.userAnswers)
    }
   
  return (
   <>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {attemptData?.info.userAnswers.map((item , index )=> (
            <Fragment key={item.questionID}>
               <div className="card">
               <p>{index+1}. {item.question}</p>
                {/* <p>{+item.questionNum}</p>
                <p>{item.question}</p> */}
                <p>Your Answer: {item.givenAnswer}</p>
                <p>Correct Answer: {item.correctAnswer}</p>
                 
                 <p style={{color : item.givenAnswer === item.correctAnswer  ? 'green' : 'red' }}>
                  {  item.givenAnswer === item.correctAnswer  ? "Your answer is Correct ": "your answer is Incorrect "}</p>
               </div>
            </Fragment>
        ))}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
   </>
  )
}

export default Modal