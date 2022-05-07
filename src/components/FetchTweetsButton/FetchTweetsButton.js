import React from 'react';

// CSS
import './FetchTweetsButton.css';

export default class FetchTweetsButton extends React.Component {
    render() {
        if (!this.props.showButton) {
            return (
                <button className='fetch-button' onClick={this.props.handleClick}>Fetch New Tweets!</button>
            )
        } else {
            return null;
        }
        
    }
}