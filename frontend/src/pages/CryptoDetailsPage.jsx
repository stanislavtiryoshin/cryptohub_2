import React from 'react'
import CryptoDetails from '../components/CryptoDetails/CryptoDetails'

const CryptoDetailsPage = ({ followedCoins }) => {
  return (
    <CryptoDetails followedCoins={followedCoins} />
  )
}

export default CryptoDetailsPage