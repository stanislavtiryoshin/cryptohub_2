import React from 'react'
import { BulbFilled } from '@ant-design/icons'

const NewsItem = () => {
  return (
    <div className="features-menu-box">
    <div className="features-item">
      <div className="item-heading" id='new'>
        <BulbFilled style={{fontSize: '600%', color: 'rgba(255, 255, 255, 0.7)'}} />
        <h1>News</h1>
      </div>
      <div className="item-text">
        <p>
          Check out the latest news of crypto market, read articles by crypto experts and even some predictions!
        </p>
      </div>
    </div>
    </div>
  )
}

export default NewsItem