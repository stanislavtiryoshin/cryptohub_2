import React, { useState, useEffect } from 'react'
import api from '../api/coins'

import Cryptocurrencies from '../components/Cryptocurrencies/Cryptocurrencies'



const CurrenciesPage = ({followedCoins}) => {

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

  return (
    <div className='currencies-page'>
      <h1>Top 100 Cryptos</h1>
      <Cryptocurrencies followedCoins={displayedCoins}/>
    </div>
  )
}

export default CurrenciesPage