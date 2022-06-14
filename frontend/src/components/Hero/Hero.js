import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../images/cryptohub.png'
import './Hero.css'

const Hero = () => {
  return (
    <div className="hero-box">

      <div className='hero-img-box'>
        <div className="hero-img-dec">
          <div className="hero-img-border">
            <div className="hero-img"></div>
            <img src={logo} alt="logo" className="hero-logo" />
          </div>
        </div>
      </div>
      <div className="hero-content-box">
        <div className="hero-content">
          <h1>
            Welcome to CryptoHub,
          </h1>
          <p>
            KZ's first service for new crypto traders. <br />
            Check current exchagne rates, read fresh crypto news and try your hand in crypto trading in our risk-free simulator.
          </p>
          <div className="hero-btns">
            <button className='btn-pink-solid'><Link to='/register' >Register</Link></button>
            <button className='btn-pink-trans'><Link to='/login'>Login</Link></button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero