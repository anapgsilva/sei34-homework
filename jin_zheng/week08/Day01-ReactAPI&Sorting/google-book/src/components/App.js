import React from 'react';
import Book from './Book'
// import './App.css';

function App() {
  return (
    <div className="App" >
        <header style={{'textAlign': 'center', backgroundColor: '#1973e8', color: 'white', margin: 0 }}> <h1> Google Book Search </h1></header>
        <Book  />
    </div>
  );
}

export default App;
