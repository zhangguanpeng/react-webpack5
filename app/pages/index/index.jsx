import React, { Component } from 'react';
import Card from './components/card/index.jsx';
import './style.css';

class IndexPage extends Component {
    render() {
        return (
            <div className="index-page-box">
                <Card />
            </div>
        );
    }
}

export default IndexPage;