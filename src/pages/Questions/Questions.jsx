import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";

const optionNum = ["a", "b", "c", "d"];

const Questions = () => {
  const [questions, setQuestions] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestions((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( question);

    try {
      await addDoc(collection(FIRESTORE, "QuizQuestions"), {
        ...questions,
      });

      alert("question submitted");
    } catch (error) {
      console.log(error);
    }
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
          <h2>Write a question and submit it to firebase.</h2>

          <label htmlFor="">Question:</label>
          <textarea
            id="w3review"
            name="question"
            rows={4}
            cols={10}
            defaultValue={``}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <label htmlFor="">Options:</label>
          <div className="options">
            {optionNum.map((item) => (
              <div key={item}>
                {item}.
                <input
                  type="text"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name={item}
                  style={{ margin: "2px 0", width: "70%" }}
                />
              </div>
            ))}
          </div>

          <label htmlFor="">Answer (a,b,c,d) :</label>
          <input
            type="text"
            name="answer"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Questions;
