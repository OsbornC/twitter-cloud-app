import React, { Component } from 'react';
import './DashboardCard.css';

export default class DashboardCard extends Component {
    render() {
        return (
            <div>
                <div className="dashboardcontainer">
                    <div className="imageContainer">
                        <img  src={this.props.image} width={230} height={310} alt="" />
                    </div>
                </div>
                <div className="descriptionContainer">
                    <p id="label">Current Rank: {this.props.rank} </p>
                    <p id="gross">Gross Total: {this.props.gross}</p>
                </div>
            </div>
        )
    }
}