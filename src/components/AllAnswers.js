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
            className={props.answer === answer ? 'correct' : 'no'}
            key={nanoid()}
            onClick={e => {
              props.updateChosenAnswer(e);
              handleClick(e)
            }}
            
            value={answer}
            data-index={props.index}
            disabled={props.isDone}
            style={(props.isDone && props.answer === answer) ? {background: '#94d7a2', border: 'none'} : (props.isDone && props.chosenAnswers.includes(answer)) ? {background: '#f8bcbc', border: 'none'} : (props.chosenAnswers.includes(answer)) ? {background: '#d6dbf5', border: 'none'} : {background: '#f5f7fb', border: '1px solid #293264'}}
          >
            {answer}
          </button>
        )
      })}
    </div>
  );
}

export default AllAnswers;