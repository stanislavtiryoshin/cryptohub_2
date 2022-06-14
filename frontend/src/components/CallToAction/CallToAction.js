import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css'

const CallToAction = () => {
  return (
    <div className="cta">


        <div className="cta-logo-wrap">
          <div className="cta-logo"></div>
        </div>
        <div className="cta-content">
          <h2>
            Become a crypto trader now!
          </h2>
          <button className="btn-pink-solid">
            <Link to={'/register'}>Join</Link>
          </button>
        </div>

    </div>
  )
}

export default CallToAction