import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Theme from './components/Theme';

function App() {
  const [isGame, setIsGame] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const startGame = () => {
    console.log('starting game');
    setIsGame(true);
  }

  const toggleTheme = () => {
    console.log('toggle theme', isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <div className="App" datatheme={isChecked ? 'dark' : 'light'} >
      <Theme isChecked={isChecked} toggleTheme={toggleTheme}/>
      {isGame ? <Quiz /> : <Home startGame={startGame} />}
    </div>
  );
}

export default App;
