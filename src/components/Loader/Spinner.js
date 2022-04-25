import React from 'react';
import { Oval } from 'react-loader-spinner';

// CSS
import './Spinner.css';

export default class Spinner extends React.Component {
    render() {
        return (
            <div className='centered'>
                <Oval type="TailSpin" color="#1DA1F2" height={240} width={240}/>
            </div>
        )
    }
}