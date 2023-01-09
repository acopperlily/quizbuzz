import React from 'react';

function Home(props) {
  return (
    <div className="homeContainer">
      <section className='home'>
        <h1>Quizzical</h1>
        <p>Test your trivial knowledge</p>
        <button className='homeButton' onClick={props.startGame}>Start quiz</button>
      </section>
    </div>
  );
}

export default Home;