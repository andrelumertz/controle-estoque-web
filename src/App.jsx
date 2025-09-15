import React from 'react';
import './App.css';
import Login from './Components/Login/Login';

const App = () => {
  return (
    <div className="container">
      <div className="banner"></div>
      <div className="form-container">
        <Login/>
      </div>
    </div>
  );
};

export default App;