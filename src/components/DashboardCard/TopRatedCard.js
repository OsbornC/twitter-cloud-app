import React, { Component } from 'react';
import './DashboardCard.css';

export default class TopRatedCard extends Component {
    render() {
        return (
            <div>
                <div className="dashboardcontainer">
                    <div className="imageContainer">
                        <img  src={this.props.image} width={230} height={310} alt="" />
                    </div>
                </div>
                <div className="descriptionContainer">
                    <p id="label">Title: {this.props.title} </p>
                </div>
            </div>
        )
    }
}