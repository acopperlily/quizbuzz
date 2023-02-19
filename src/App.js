import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  const [isGame, setIsGame] = useState(true);

  const startGame = () => {
    console.log('starting game');
    setIsGame(true);
  }

  return (
    <div className="App">
      {isGame ? <Quiz /> : <Home startGame={startGame} />}
    </div>
  );
}

export default App;
