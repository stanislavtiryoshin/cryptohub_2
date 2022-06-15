import React, { useState, useEffect } from 'react'
import millify from 'millify'
import api from '../../api/coins'

import { FireOutlined } from '@ant-design/icons'

import Loader from '../Loader/Loader'
import './CryptoHold.css'

import { useGetCryptoDetailsQuery } from '../../services/cryptoApi'

const CryptoHold = ({ updateHeldCoins, rank, symbol, amount, price, sum, id }) => {
  const { data, isFetching } = useGetCryptoDetailsQuery(id)
  const currentPrice = data?.data?.coin?.price

  const deleteCoin = async () => {
    await api.delete(`/held_coins/${id}`)
    updateHeldCoins()
  }

    /** Change Color */

    const [changeClass, setChangeClass] = useState('neutr')

    useEffect(() => {
      if (parseInt(currentPrice - price) >= 1) setChangeClass('posit')
      else if (parseInt(currentPrice - price) <= -1) setChangeClass('negat')
      else setChangeClass('neutr')
    }, [])

  if (isFetching) return <Loader />

  return (
    <div className="held-card">
      <div className="held-heading">
        <p>{rank}.</p>
        <p>{symbol}</p>
      </div>
      <p>{millify(amount, {precision: 5})}</p>
      {
        currentPrice && <p><font className={changeClass}>${millify(currentPrice - price, {precision: 3})}</font> </p>
      }
      <p>${sum}</p>
      {
        currentPrice && <p>${millify(currentPrice * amount, {precision: 3})}</p>
      }
      {
        currentPrice && <p className='held-card-end'><font className={changeClass}>${millify(currentPrice * amount - sum, {precision: 3})}</font></p>
      }
      <button className="btn-delete" onClick={() => deleteCoin()}> <FireOutlined style={{color: 'red'}} /> </button>
    </div>
  )
}

export default CryptoHold