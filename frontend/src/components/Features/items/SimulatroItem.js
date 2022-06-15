import React from 'react'
import { DollarCircleFilled } from '@ant-design/icons'

const SimulatroItem = () => {
  return (
    <div className="features-menu-box">
    <div className="features-item">
      <div className="item-heading" id='sim'>
        <DollarCircleFilled style={{fontSize: '600%', color: 'rgba(255, 255, 255, 0.7)'}} />
        <h1>Simulator</h1>
      </div>
      <div className="item-text">
        <p>
          If only I had invested in this crypto... Try your hand at risk-free simulator of crypto trading!
        </p>
      </div>
    </div>
    </div>

  )
}

export default SimulatroItem