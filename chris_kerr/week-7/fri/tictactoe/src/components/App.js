import React from 'react';
import Square from './Square';
import Board from './Board';
import Game from './Game';
import calculateWinner from './Board'

function App() {
  return (
    <div className="App">
       <Game />
    </div>
  );
}

export default App;
