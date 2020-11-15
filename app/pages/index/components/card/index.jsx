import React, { Component } from 'react';
import { getUrlParam } from '../../../../utils/url.js';
import './style.scss';

class Card extends Component {
    componentDidMount() {
        console.log('getUrlParam id', getUrlParam('id'));
    }

    render() {
        return (
            <div className="card-component-box">
                <span>Hello React !!</span>
            </div>
        );
    }
}

export default Card;