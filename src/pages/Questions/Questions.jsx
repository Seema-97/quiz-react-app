import React, { Fragment, useState } from "react";
const optionNum = ['a' , 'b' ,'c' , 'd']

const Questions = () => {

   
      const [option , setOption] = useState({
       name : []
      })

   
      const handleChange = (e) => {
        const {value} = e.target ;
    
        setOption((prev) => {
             return {
               name : [...prev.name,value ]
            }
            }
            )
    
      }

      const handleSubmit = (e) => {
         e.preventDefault() ;
         console.log(option) ;
      }






  return (
    <>
      <form style={{display:'flex' ,flexDirection:'column', alignItems:'center' , justifyContent: 'center'}}>

            <div className="card" style={{margin: '10px' , padding: '30px'}}>
            <textarea
              id="w3review"
              name="w3review"
              rows={4}
              cols={10}
              defaultValue={`` }
            />

            {optionNum.map(item => (
                <div key={item}> 
                {item}.<input type="text" onChange={handleChange} name={`option-${item}`}/>  
                </div>
            ))}

            </div>
      

        <button className="btn btn-success" onClick={handleSubmit}>Submit</button>

      </form>
    </>
  );
};

export default Questions;
