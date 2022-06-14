import React from 'react';
import { useGetGlobalsQuery } from '../../services/cryptoApi';
import PieChart from '../PieChart/PieChart'
import Loader from '../Loader/Loader'
import millify from 'millify';

import { PieChartOutlined, DollarOutlined, FundOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import './Globals.css'

function Globals({share}) {
  
  const { data, isFetching } = useGetGlobalsQuery()

  if (isFetching) return <Loader />

  return (
    <div className='globals'>
    <h2>Global Crypto Stats</h2>
    <div className='globals-box'>
      <div className="globals-chart">
        <PieChart share={data?.data?.btcDominance}/>
      </div>
      <div className="globals-content">
        <h3 className="globals-heading"><PieChartOutlined /> <font id="btc">BTC</font> market share: <font>{millify(data?.data?.btcDominance)}%</font></h3>
        <h3 className="globals-heading"><DollarOutlined /> Total coins: <font>{millify(data?.data?.totalCoins)}</font></h3>
        <h3 className="globals-heading"><FundOutlined /> Total markets: <font>{millify(data?.data?.totalMarkets)}</font></h3>
        <h3 className="globals-heading"><MoneyCollectOutlined/> Market cap: <font>${millify(data?.data?.totalMarketCap)}</font></h3>
        <h3 className="globals-heading"><DollarOutlined /> Traded in 24h: <font>${millify(data?.data?.total24hVolume)}</font></h3>
      </div>
    </div>
    </div>
  )
}

export default Globals