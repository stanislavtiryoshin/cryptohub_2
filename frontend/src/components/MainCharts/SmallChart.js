import React from 'react'
import { Link } from 'react-router-dom'
import LineChart from '../LineChart/LineChart'
import { useGetCryptoHistoryQuery } from '../../services/cryptoApi'

const SmallChart = ({coin, coinId, symbol, imgUrl, text}) => {
  const timeperiod = '24h'
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timeperiod})
  let coinClass
  if (coin === 'btc') coinClass='main-chart btc' 
  else if (coin === 'eth') coinClass='main-chart eth' 
  else coinClass='main-chart teth'

  return (
    <div className={coin === 'btc' ? "main-chart-box-wrap btc" : "main-chart-box-wrap"}>
      <div className="main-chart-box">
      <div className={coinClass}>
        <div className="main-chart-head">
          <Link to={`/crypto/${coinId}`}><h3>{symbol} <img src={imgUrl} alt="coin icon" /> </h3></Link>
          <LineChart coinHistory={coinHistory} simplified/>
        </div>
      </div>
      <div className="main-chart-content">
        {text}
      </div>
    </div>
    </div>
  )
}

export default SmallChart