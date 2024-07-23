import React, { Fragment, useState } from "react";
import { collection, addDoc} from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";

const optionNum = ["a", "b", "c", "d"];

const Questions = () => {
  const [questionNum, setQuestionNum] = useState({
    questionNum: 0,
  });

  const [question, setQuestion] = useState({
    question: "",
  });

  const [option, setOption] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
  });

  const [answer, setAnswer] = useState({
    answer: "",
  });



  const handleQuestionNum = (e) => {
    const { name, value } = e.target;
    setQuestionNum((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleQuestion = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

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
    setAnswer((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(questionNum, question);
    console.log(option);

    await addDoc(collection(FIRESTORE, "QuizQuestions"), {
      ...questionNum,
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
          <label htmlFor="">Ques No:</label>
          <input
            type="number"
            name="questionNum"
            onChange={handleQuestionNum}
          />
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
