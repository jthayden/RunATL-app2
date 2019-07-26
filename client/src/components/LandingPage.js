import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class LandingPage extends Component {
    render() {
        return (
            <Link to='/neighborhoods'>
            <div className='container'>
                <div className='landing-page'><h1>RunATL</h1>
                <h3>Find your run...</h3></div>
                <video playsInLine='true' autoPlay='true' loop='true'>
                    <source src='images/Runningvideo2.mp4' type='video/mp4'/>
                </video>
            </div>
            </Link>
        )
    }
}
