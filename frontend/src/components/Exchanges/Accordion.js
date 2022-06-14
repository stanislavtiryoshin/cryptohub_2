import React, { useState } from 'react'
import millify from 'millify'

import { LeftOutlined } from '@ant-design/icons'

const Accordion = ({rank, title, content}) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <div className="accord-box" onClick={() => setIsActive(!isActive)}>
      <div className={!isActive ? "accord-heading" : "accord-heading active"}>
        <h3>{rank}. <img src={content.image} alt="exchange icon" /> {title}</h3>
        <h3>24h trade volume: BTC {millify(content.trade_volume_24h_btc)}</h3>
        <LeftOutlined className={isActive ? "arrow active" : "arrow"} />
      </div>
      <div className={!isActive ? "accord-content" : "accord-content active"}>
        <div className="accord-content-main">
          <p>Website: <a href={content.url}>{content.url}</a></p>
          <p>Established: {content.year_established}</p>
          <p>Country: {content.country}</p>
        </div>
        {content.description && 
          <p>{content.description.length > 500 ? `Description: ${content.description.substring(0, 500)}...` : content.description}</p>
        }
      </div>
    </div>
  )
}

export default Accordion