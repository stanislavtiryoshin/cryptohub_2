import React, { useState, useEffect } from 'react';

import CurrenciesItem from './items/CurrenciesItem';
import ExchangesItem from './items/ExchangesItem';
import NewsItem from './items/NewsItem';
import SimulatorItem from './items/SimulatroItem';

import './Features.css'

const Features = () => {

  const [item, setItem] = useState(0)

  useEffect(() => {
      document.querySelectorAll(".features-menu-box").forEach(feature => {
        feature.classList.add('active')
      })
  })

  let displayedItem
  if (item === 0) displayedItem = <CurrenciesItem />
  if (item === 1) displayedItem = <NewsItem />
  if (item === 2) displayedItem = <ExchangesItem />
  if (item === 3) displayedItem = <SimulatorItem />

  return (
    <div className="features-box">
      <h1 className='features-heading'>
          CryptoHub's Features
      </h1>
      <div className="menu-box-wrap">
        
          {displayedItem}
        </div>
      <div className="features-menu">
          <div className={(item === 0) ? "features-menu-item active" : "features-menu-item inactive"} onClick={() => setItem(0)}>
            <h3>Currencies</h3>
          </div>
          <div className={(item === 1) ? "features-menu-item active" : "features-menu-item inactive"} onClick={() => setItem(1)}>
            <h3>News</h3>
          </div>
          <div className={(item === 2) ? "features-menu-item active" : "features-menu-item inactive"} onClick={() => setItem(2)}>
            <h3>Exchanges</h3>
          </div>
          <div className={(item === 3) ? "features-menu-item active" : "features-menu-item inactive"} onClick={() => setItem(3)}>
            <h3>Simulator</h3>
          </div>
        </div>

    </div>
  )
}

export default Features