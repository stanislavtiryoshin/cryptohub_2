import React from 'react'
import { MoneyCollectFilled } from '@ant-design/icons'

const CurrenciesItem = () => {

  return (
    <div className="features-menu-box">
      <div className="features-item">
        <div className="item-heading" id='cur'>
          <MoneyCollectFilled style={{fontSize: '600%', color: 'rgba(255, 255, 255, 0.7)'}} />
          <h1>Currencies</h1>
        </div>
        <div className="item-text">
          <p>
            Find out today's most prominent cryptocurrencies, get to know their history and background.        
          </p>
        </div>
      </div>
    </div>

  )
}

export default CurrenciesItem