import React from 'react'
import { FundFilled } from '@ant-design/icons'

const ExchangesItem = () => {
  return (
    <div className="features-menu-box">
    <div className="features-item">
      <div className="item-heading">
        <FundFilled style={{fontSize: '600%', color: 'rgba(255, 255, 255, 0.7)'}} />
        <h1>Exchanges</h1>
      </div>
      <div className="item-text">
        <p>
          Check out the echanges rates for any cryptocurrency.
        </p>
      </div>
    </div>
    </div>
  )
}

export default ExchangesItem