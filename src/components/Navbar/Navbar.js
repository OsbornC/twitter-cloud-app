import React from 'react';
import { NavLink } from "react-router-dom";

// Images
import logo from "../../images/twitter.png";

// CSS
import './Navbar.css';

class Navbar extends React.Component {
    render() {
        let imgHeight = "15px"
        let imgWidth = "15px"
        return(
            <div className='multi-button'>
                <div className='logo'><img src={logo} alt="" height="20vh" width="auto" /></div>
                {(this.props.toggleMenu || this.props.widthSize > 700) && (
                    <div className='nav'>
                        <div className='navbar' >
                            <div className='icon-button' >
                                <NavLink to='/' style={{ textDecoration: 'none' }} exact={true} activeStyle={{ textDecoration: 'underline', textDecorationColor: 'grey' }} >
                                    <div className='content'>
                                        <div className='text'>
                                            <p className='text'>Home</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='icon-button'>
                                <NavLink to='/top_box_office' style={{ textDecoration: 'none'}} activeStyle={{ textDecoration: 'underline', textDecorationColor: 'grey' }}>
                                    <div className='content'>
                                        <div className='text'>
                                            <p className='text'>Top Box Office</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className='icon-button'>
                                <NavLink to='/top_rated' style={{ textDecoration: 'none' }} activeStyle={{ textDecoration: 'underline', textDecorationColor: 'grey' }}>
                                    <div className='content'>
                                        <div className='text'>
                                            <p className='text'>Top Rated</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Navbar