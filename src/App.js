import React, { useState, useEffect } from 'react';
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton
} from 'react-twitter-embed';

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
        <TwitterTweetEmbed
          tweetId={'1514813553177362434'}
          options={{ height: 800 }}
        />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="saurabhnemade"
          options={{ height: 800 }}
        />
        <TwitterHashtagButton
          tag={'imdb'}
        />
      </header>
    </div>
  );
}

export default App;
