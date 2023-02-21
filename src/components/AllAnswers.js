import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

function AllAnswers(props) {

  const initializeState = arr => {
    const state = {};
    for (let item of arr) {
      state[item] = false;
    }
    return state;
  }


  const [answers, setAnswers] = useState(props.allAnswers);
  const [isSelected, setIsSelected] = useState([]);

  useEffect(() => {
    setIsSelected(initializeState(answers));
  }, []);

  const handleClick = e => {
    e.preventDefault();
    const current = isSelected[e.target.value];
    setIsSelected({
      ...initializeState(answers),
      [e.target.value]: !current
    });
  };

  return (
    <div className='answers'>
      {props.allAnswers.map((answer, i) => {
        return (
          <button 
            className={
              props.isDone && props.answer === answer
              ? 'correctAnswer'
              : props.isDone && props.chosenAnswers.includes(answer)
              ? 'incorrectAnswer'
              : props.chosenAnswers.includes(answer)
              ? 'selectedAnswer'
              : 'unselectedAnswer'}
            
            key={nanoid()}
            onClick={e => {
              props.updateChosenAnswer(e);
              handleClick(e)
            }}
            
            value={answer}
            data-index={props.index}
            disabled={props.isDone}
          >
            {answer}
          </button>
        )
      })}
    </div>
  );
}

export default AllAnswers;