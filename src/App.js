import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isGame, setIsGame] = useState(false);
  const [isDark, setIsDark] = useState(
    () => JSON.parse(localStorage.getItem('isDark'))
  );

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
  }, [isDark]);

  const startGame = () => {
    console.log('starting game');
    setIsGame(true);
  }

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="App" datatheme={isDark ? 'dark' : 'light'} >
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        {isGame ? <Quiz /> : <Home startGame={startGame} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
