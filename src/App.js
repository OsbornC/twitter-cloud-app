import React from "react";
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const handelLogin = ()=>{
  const doc = 'SalesOrder1'
  const number = 'Account1'
  // axios.get(`https://clooud-project-twitter-app.azurewebsites.net?name=${name}`).then((obj) => {
  //   console.log('login', obj)
  // })
  axios.get(`http://127.0.0.1:5000/read`, {params: {
    doc_id: doc,
    account_number: number
  }}).then((obj) => {
    console.log('login', obj)
  })
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handelLogin}>try</button>
      </header>
    </div>
  );
}

export default App;
