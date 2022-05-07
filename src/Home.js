import React, { useState, useEffect } from 'react';
import Spinner from './components/Loader/Spinner';
import BoxOffice from './components/BoxOffice';
import TopRated from './components/TopRated';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Button.css";

// Navbar
import Navbar from './components/Navbar/Navbar';

const Home = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [items, setItems] = useState([]);
    const { height, width } = useWindowDimensions();
    
    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    }

    if (items.length !== undefined) {
        if (items.length === undefined) window.location.reload();
        return (
            <div>
                <BrowserRouter forceRefresh>
                    <Navbar pushPath={pushPath} toggleMenu={toggleMenu} 
                        toggleNav={toggleNav} widthSize={width}  />
                    <Routes>
                        <Route path="/" element={<BoxOffice />} />
                        <Route path="/top_box_office" element={<BoxOffice />} />
                        <Route path="/top_rated" element={<TopRated />} />
                    </Routes>
                </BrowserRouter>
                <div className='footer'></div>
            </div >
        )
    } else {
        return (
            <div>
                <Spinner />
            </div>
        )
    }
}

function pushPath(history, path) {
    history.push(path);
}


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


export default Home;