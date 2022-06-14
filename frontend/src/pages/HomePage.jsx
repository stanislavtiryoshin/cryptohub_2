import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import CallToAction from '../components/CallToAction/CallToAction';
import Globals from '../components/Globals/Globals'
import Cryptocurrencies from '../components/Cryptocurrencies/Cryptocurrencies';
import Exchanges from '../components/Exchanges/Exchanges';
import News from '../components/News/News';
import MainCharts from '../components/MainCharts/MainCharts';

import api from '../api/coins'

const HomePage = ({followedCoins}) => {

  const [displayedCoins, setDisplayedCoins] = useState([followedCoins])

  const retrieveFollowedCoins = async () => {
    const response = await api.get("/coins")
    return response.data
  }

  useEffect(() => {
    const getDisplayedCoins = async () => {
      const allFollowedCoins = await retrieveFollowedCoins()
      if(allFollowedCoins) setDisplayedCoins(allFollowedCoins)
    }
    getDisplayedCoins()
  }, [])

  console.log(displayedCoins)
  
  return (
    <>
      <Hero />
      <Features />
      <Globals />
      <MainCharts />
      <div className="home-title">
        <h2>Top 5 Exchanges</h2>
        <Link to='/exchanges'>Show more</Link>
      </div>
      <Exchanges simplified />
      <div className="home-title">
        <h2>Top 10 Cryptos</h2>
        <Link to='/currencies'>Show more</Link>
      </div>
      <Cryptocurrencies simplified={true} followedCoins={displayedCoins} />
      <div className="home-title">
        <h2>Freshest News</h2>
        <Link to='/news'>Show more</Link>
      </div>
      <News simplified />
      <CallToAction />
    </>
  )
}

export default HomePage