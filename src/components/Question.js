import { Button } from 'antd';
import React, { useState, useEffect, useRef } from 'react';

const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
  const [selected, setSelected] = useState('');
  const radiosWrapper = useRef();
  const[error,setError]=useState("");
  const[seconds,setSeconds]=useState(10)
  const[minutes,setMinutes]=useState(0)

  
  useEffect(()=>{
    const timeout = setTimeout(() => {
      setSeconds(seconds-1)
      console.log("numberOfQuestions", numberOfQuestions);
     
       if (
         activeQuestion < numberOfQuestions -1 
         
       ) {
        
         if (seconds === 0) {
           setSeconds(10);
           onSetActiveQuestion(activeQuestion + 1);
         }
       }
       else if(activeQuestion+1 === numberOfQuestions){
      
         if(seconds === 10)
          setSeconds(seconds-1)
          if(seconds===0){
            onSetStep(3);
          }
          
         
        
       }
        else {
         onSetStep(3);
       }
    
    }, 1000);

    return () => clearTimeout(timeout);
  })
  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
     if (error) {
       setError("");
     }
  
  }

  const nextClickHandler = (e) => {
   if (selected === "") {
     return setError("");
   }
    onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    
    if(activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
      setSeconds(10)
    }else {
      onSetStep(3);
    }
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
        <div className='div'>
          <div className='timer-text'>Time Left</div>
         <div className='timer-sec'>{minutes}:{seconds} </div> 
          
          <hr className='hr'/>
          
        </div>
        
          <h2>
          {activeQuestion+1}/{numberOfQuestions}</h2>
          
          <h2 className="mb-5">{data.question}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <label className="radio has-background-light" key={i}>
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  onChange={changeHandler}
                />
                {choice}
              </label>
            ))}
          </div>
<div>{error}</div>
          <Button type='primary'
            className="btn"
            onClick={nextClickHandler}
            
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Question;