import React, { Fragment, useState } from "react";

const questions = [
  {
    id: 1,
    question: "What is the capital of India",
    options: [
      { optNumber: "a", optName: "Mumbai" },
      { optNumber: "b", optName: "New Delhi" },
      { optNumber: "c", optName: "Chandigardh" },
      { optNumber: "d", optName: "Bangaluru" },
    ],
    correctAns: "b",
  },
  {
    id: 2,
    question: "What is the capital of Gujarat",
    options: [
      { optNumber: "a", optName: "Surat" },
      { optNumber: "b", optName: "Rajkot" },
      { optNumber: "c", optName: "Gandhinagar" },
      { optNumber: "d", optName: "Ahmedabad" },
    ],
    correctAns: "c",
  },
  {
    id: 3,
    question: "What is the capital of Bihar",
    options: [
      { optNumber: "a", optName: "Gaya" },
      { optNumber: "b", optName: "Baliya" },
      { optNumber: "c", optName: "Patna" },
      { optNumber: "d", optName: "Aara" },
    ],
    correctAns: "c",
  },
  {
    id: 4,
    question: "What is the capital of Rajasthan",
    options: [
      { optNumber: "a", optName: "Jaipur" },
      { optNumber: "b", optName: "Udaipur" },
      { optNumber: "c", optName: "Mount Abu" },
      { optNumber: "d", optName: "Aara" },
    ],
    correctAns: "a",
  },
  {
    id: 5,
    question: "What is the capital of Maharastra",
    options: [
      { optNumber: "a", optName: "Nagpur" },
      { optNumber: "b", optName: "Mumbai" },
      { optNumber: "c", optName: "Pune" },
      { optNumber: "d", optName: "Thane" },
    ],
    correctAns: "b",
  },
];

const Quiz1 = () => {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setInCorrectAnswers] = useState([]);

  const [submitBtnClicked, setSubmitBtnClicked] = useState(false);

  const handleOnChange = (e) => {
    const { value, checked, className, name } = e.target;
    if (checked) {
      if (value == className) {
        setCorrectAnswers((prev) => {
          return [
            ...correctAnswers,
            {
              ...prev,
              questionNum: name,
              answer: value,
            },
          ];
        });
        console.log("your answer is correct");
      } else {
        setInCorrectAnswers((prev) => {
          return [
            ...incorrectAnswers,
            {
              questionNum: name,
              answer: value,
            },
          ];
        });
        console.log("your answer is incorrect");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitBtnClicked(true);
    console.log("correct answers are", correctAnswers);
    console.log("incorrect answers are", incorrectAnswers);
  };

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {questions.map((item) => (
            <Fragment key={item.id}>
              <div className = {`carousel-item ${item.id === 1 ? 'active' : ''}`}>
                <h4>
                  {item.id}.{item.question}?
                </h4>

                <div className="options">
                  {item.options.map((option) => (
                    <Fragment key={option.optName}>
                      <div style={{ display: "flex" }}>
                        <input
                          type="radio"
                          name={item.id}
                          onChange={handleOnChange}
                          value={option.optNumber}
                          className={item.correctAns}
                        />{" "}
                        <p>
                          <span>{option.optNumber}. </span>
                          <span>{option.optName}</span>
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* {questions.map((item) => (
        <Fragment key={item.id}>
          <h4>
            <span>{item.id}.</span> <span>{item.question}?</span>
          </h4>

          <div className="options">
          {item.options.map((option) => (
            <Fragment key={option.optName}>
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  name={item.id}
                  onChange={handleOnChange}
                  value={option.optNumber}
                  className={item.correctAns}
                />{" "}
                <p>
                  <span>{option.optNumber}. </span>
                  <span>{option.optName}</span>
                </p>
              </div>
            </Fragment>
          ))}
          </div>

          
        </Fragment>
      ))} */}

        <button onClick={handleSubmit}>Submit</button>
      </form>

      {submitBtnClicked && (
        <>
          <div
            className="display"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="answersKey"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <p
                style={{ color: "green", fontSize: "18px", fontWeight: "bold" }}
              >
                correct answers are :{" "}
              </p>
              {correctAnswers.map((item, index) => (
                <Fragment key={index}>
                  <span>
                    <p
                      style={{
                        color: "green",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {item.questionNum}.{item.answer} ,{" "}
                    </p>
                  </span>
                </Fragment>
              ))}
            </div>
            <div
              className="answersKey"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <p style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>
                Incorrect answers are :{" "}
              </p>
              {incorrectAnswers.map((item, index) => (
                <Fragment key={index}>
                  <span>
                    <p
                      style={{
                        color: "red",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {item.questionNum}.{item.answer} ,
                    </p>
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Quiz1;
