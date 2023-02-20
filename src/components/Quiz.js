import React, { useState, useEffect, useRef } from 'react';
import AllAnswers from './AllAnswers';
import { nanoid } from 'nanoid';
import Confetti from './Confetti';

function Quiz() {

  const [quizData, setQuizData] = useState([]);
  const [count, setCount] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState(
    () => JSON.parse(localStorage.getItem('scores')) || []
  );
  const [average, setAverage] = useState();

  const decode = text => {
    let result = new DOMParser().parseFromString(text, 'text/html');
    return result.documentElement.textContent;
  }

  const randomize = arr => {
    const result = [];
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * arr.length);
      } while (indices.includes(index));
      indices.push(index);
      result.push(arr[index]);
    }
    return result;
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        let oof = data.results.map(item => {
          return {
            question: decode(item.question),
            answer: decode(item.correct_answer),
            wrongAnswers: item.incorrect_answers.map(x => decode(x))
          }
        });
        console.log('oof:', oof);
        setQuizData(oof);
        setChosenAnswers(Array.from({length: data.results.length}, x => ''));
        setAllAnswers(oof.map(item => {
          let unsorted = item.wrongAnswers.concat(item.answer);
          return randomize(unsorted);
        }));
        setStartGame(false);
      }
    );
  }, [startGame]);



  const updateChosenAnswer = e => {
    e.preventDefault();
    const index = e.target.dataset.index;
    const prevValue = chosenAnswers[index];
    const updatedAnswers = [...chosenAnswers];
    if (prevValue === e.target.value) {
      updatedAnswers[index] = '';
    } else {
      updatedAnswers[index] = e.target.value;
    }
    setChosenAnswers(updatedAnswers);
  };

  const checkAnswers = () => {
    let correct = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (chosenAnswers[i] === ''){
        console.log('not done');
        return;
      }
      if (quizData[i].answer === chosenAnswers[i])
        correct++;
    }
    setIsDone(true);
    setScores(prevScores => [...prevScores, correct]);

    setCount(correct);
    setScore(correct);
    return correct;
  };

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [score]);

  useEffect(() => {
    function getAverage() {
      let sum = scores.reduce((acc, c) => acc + c, 0);
      sum = sum / scores.length;
      sum = Number(sum.toFixed(1));
      console.log('average effect:', sum);
      setAverage(sum);
    }
    getAverage();
  }, [scores]);

  const handleSubmit = e => {
    e.preventDefault();
    checkAnswers();
  };

  const newGame = () => {
    setIsDone(false);
    setCount(0);
    setStartGame(true);
  };

  const questions = quizData.map((data, i) => {
    return (
      <div className='trivia' key={nanoid()}>
        {i !== 0 && <hr />}
        <h2 className='question' key={nanoid()}>{data.question}</h2>
        <AllAnswers 
          key={nanoid()}
          index={i}
          answer={data.answer}
          wrongAnswers={data.wrongAnswers}
          allAnswers={allAnswers[i]}
          updateChosenAnswer={updateChosenAnswer}
          isDone={isDone}
          chosenAnswers={chosenAnswers}
        />
      </div>
    );
  });

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className="submitForm">
        {questions}
        {!isDone && <div className='checkAnswers'><button>Check answers</button></div>}
      </form>
      <div className='bottom'>
        {count === 5 ? <Confetti /> : null}
        {isDone && <h3>You scored {count}/{quizData.length} correct answers</h3>}
        {isDone && <button onClick={newGame}>Play again</button>}
        {average && <p>Average score: {average}</p>}
      </div>
    </div>
  );
}

export default Quiz;