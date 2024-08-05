import React, { Fragment, useState } from "react";
import { collection, addDoc} from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";

const optionNum = ["a", "b", "c", "d"];

const Questions = () => {


  const [question, setQuestion] = useState({});

  const [option, setOption] = useState({});

  const [answer, setAnswer] = useState({});

  const handleQuestion = (e) => {
    const { name, value } = e.target;
    setQuestion({[name]: value});
   }

  const handleOption = (e) => {
    const { name, value } = e.target;

    setOption((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAnswer = (e) => {
    const { name, value } = e.target;
    setAnswer( {[name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( question);
    console.log(inputValue);

    await addDoc(collection(FIRESTORE, "QuizQuestions"), {
      inputValue ,
      ...question,
      ...option,
      ...answer,
    })
      .then(() => {
        alert("Submitted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="card" style={{ margin: "10px", padding: "30px" }}>
          
          <textarea
            id="w3review"
            name="question"
            rows={4}
            cols={10}
            defaultValue={``}
            onChange={handleQuestion}
          />

          {optionNum.map((item) => (
            <div key={item}>
              {item}.<input type="text" onChange={handleOption} name={item} />
            </div>
          ))}

          <input type="text" name="answer" onChange={handleAnswer} />
        </div>

        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>

      </form>
    </>
  );
};

export default Questions;
