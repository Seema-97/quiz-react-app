import './Quiz2.css'
import { Fragment, useState } from "react"
import { QUESTIONS } from "./DATA"


const Quiz2 = () => {

    // const handleSubmit = () => {
    //     QUESTIONS.forEach(item => {
    //         let usersAns = document.querySelectorAll(`.answer-${item.id}`); // user's answer
    //         let quest = document.querySelector(`.quest-${item.id}`); // user's question
    //         usersAns.forEach(option => {
    //             if (option.checked) {
    //                 if (option.value === item.correct) {
    //                     console.log("Correct", item.id, item.correct, option.value);
    //                     quest.style.color = "green";
    //                 } else {
    //                     console.log("Wrong", item.id, item.correct, option.value);
    //                     quest.style.color = "red";
    //                 }
    //             }
    //         })

    //     })
    // }


    const [radioValues, setRadioValues] = useState([]);
    const [correctValues, setCorrectValues] = useState({});


    const handleChange = (e) => {
        const { checked, value } = e.target;
        setRadioValues(prev => {
            if (checked) {
                // return {
                //     ...prev,
                //     [name]: value
                // }
                // object

                return [...prev, value] // array convert
            }
        })
    }

    console.log(radioValues)

    const handleSubmit = () => {
        // QUESTIONS.forEach((item, index) => {
        //     if (item.correct === radioValues[index]) {
        //         console.log("Correct answers ", item.id, item.correct);
        //     } else {
        //         console.log("Wrong answers ", item.id, item.correct);
        //     }
        // })


        // highlight
        QUESTIONS.forEach((item, index) => {
            setCorrectValues(prev => {
                return {
                    ...prev,
                    [item.id]: radioValues[index],
                    status: true,
                }
            })   
        })

        console.log(correctValues) ;
    }


    return (
        <>
            {QUESTIONS.map(item => (
                <Fragment key={item.id}>
                    <h2 className={`quest-${item.id}  ${correctValues[item.id] === item.correct ? "right" : correctValues?.status ? "wrong" : ""}`}>{item.id}.{item.question} ?</h2>
                    {item.answers.map(answer => (
                        <p key={answer.name}><input onChange={handleChange} type="radio" className={`answer-` + item.id} name={`answer-` + item.id} value={answer.option} />{answer.option} {answer.name}</p>
                    ))}
                </Fragment>

            ))}
            <button onClick={handleSubmit} className="btn btn-primary" id="submit">Submit</button>
        </>
    )
}

export default Quiz2