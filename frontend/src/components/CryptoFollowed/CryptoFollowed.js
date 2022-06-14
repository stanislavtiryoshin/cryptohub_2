import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'
import api from '../../api/coins'

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import LineChart from '../LineChart/LineChart';

import { StarOutlined, StarFilled } from '@ant-design/icons'
import './CryptoFollowed.css'

const CryptoFollowed = ({ updateFiat, updateHeldCoins, followedCoins, heldCoins, uuid, rank, name, iconUrl, symbol, price, marketCap, change, id }) => {
  const timeperiod = '24h'
  const coinId = uuid
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timeperiod})
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const currentPrice = data?.data?.coin?.price
  
  const [isFollowed, setIsFollowed] = useState()
  const [sumToBuy, setSumToBuy] = useState('')
  const [sumToSell, setSumToSell] = useState('')

  /** Read input */

  const handleSumChange = (e) => {
    setSumToBuy(e.target.value)
  }

  const handleSellSumChange = (e) => {
    setSumToSell(e.target.value)
  }

  /** Follow Coin */

  useEffect(() => {
    setIsFollowed(followedCoins.some(coin => coin.uuid === uuid))
  }, [followedCoins])

  
  const [isHeld, setIsHeld] = useState()

  useEffect(() => {
    setIsHeld(heldCoins.some(coin => coin.uuid === uuid))
  })

  const oldSum = heldCoins.filter(coin => coin.uuid === uuid)[0]?.sum

  const followCoin = async () => {
    setIsFollowed(!isFollowed)
    if (!isFollowed) { 
      await api.post("/coins", {
        uuid,
        rank,
        name,
        iconUrl,
        symbol,
        price,
        marketCap,
        change,
        id
      }) 
    } else if (isHeld) {
      alert('You cannot unfollow a held coin!')
    } else {
      await api.delete(`/coins/${id}`)
    }
  }

  /** Add coin to Held */


  /** Buy Coin */

  const buyCoin = async () => {
    const fiatData = await api.get("/fiat")
    let currFiat = fiatData?.data[0]?.fiat
    if (currFiat < sumToBuy) {
      alert('Insufficient Funds!')
    } else {
      if (!isHeld) {
        await api.post("/held_coins", {
          uuid,
          rank,
          name,
          iconUrl,
          symbol,
          price: price,
          sum: parseInt(sumToBuy),
          amount: parseInt(sumToBuy)/parseInt(price),
          id
        })
      } else {
        await api.put(`/held_coins/${id}`, {
          uuid,
          rank,
          name,
          iconUrl,
          symbol,
          price: price,
          sum: parseInt(oldSum) + parseInt(sumToBuy),
          amount: (parseInt(oldSum) + parseInt(sumToBuy))/parseInt(price),
          id
        })
      }
      await api.put("/fiat/0", {
        id: 0,
        fiat: currFiat - parseInt(sumToBuy)
      })
      updateHeldCoins()
      updateFiat()
      setSumToBuy('')  
    }
  }

  /** Sell Coin */

  const sellCoin = async () => {
    const fiatData = await api.get("/fiat")
    let currFiat = fiatData?.data[0]?.fiat
    if (heldCoins.filter(coin => coin.uuid === uuid)[0].sum < sumToSell) {
      alert(`You don't have enough ${symbol}!`)
    } else {
      if (isHeld) {
        await api.put(`/held_coins/${id}`, {
          uuid,
          rank,
          name,
          iconUrl,
          symbol,
          price: currentPrice ? parseInt(currentPrice) : price,
          sum: parseInt(oldSum) - parseInt(sumToSell),
          amount: (parseInt(oldSum) - parseInt(sumToSell))/parseInt(currentPrice),
          id
        })
        await api.put("/fiat/0", {
          id: 0,
          fiat: parseInt(currFiat) + parseInt(sumToSell)
        })
      }
      updateFiat()
      updateHeldCoins()
      setSumToSell('')
    }
  }

  /** Change Color */

  const [changeClass, setChangeClass] = useState('neutr')

  useEffect(() => {
    if (parseInt(change) >= 1) setChangeClass('posit')
    else if (parseInt(change) <= -1) setChangeClass('negat')
    else setChangeClass('neutr')
  }, [])


  return (
    <div className={isFollowed ? "crypto-foll-card" : "crypto-foll-card disabled"}>

        <div className="crypto-foll-heading">
          <button className='btn-follow' onClick={() => followCoin()}>
            {
              isFollowed && <StarFilled style={{color: 'rgb(255, 208, 0)', fontSize: '150%'}} /> 
            }
            {
              !isFollowed && <StarOutlined  style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: '150%'}} />
            }
          </button>
          <h3>
            {rank}. <img src={iconUrl} alt="coin icon" /> <Link to={`/crypto/${uuid}`} key={uuid}><font>{name}</font></Link>
          </h3>
          <p>({symbol})</p>
        </div>

        <p>${currentPrice && isHeld ? millify(currentPrice, {precision: 3}) : millify(price, {precision: 3})}</p>
        <p>${millify(marketCap, {precision: 3})}</p>
        <p><font className={changeClass}>{millify(change, {precision: 3})}%</font></p>

        <div className="crypto-foll-inputs">
        
        <div className="crypto-input-box">
        <button className="btn-buy btn-pink-solid" onClick={() => {buyCoin()}} >Buy</button>
        <input 
          className='sum-input'
          type="number"
          placeholder='Sum to Buy'
          value={sumToBuy}s
          onChange={handleSumChange}
        />
        </div>

        {
        isHeld && 
          <div className='crypto-input-box'>
            <button className="btn-buy btn-pink-solid" onClick={() => sellCoin()} >Sell</button>
            <input 
              className='sum-input'
              type="number"
              placeholder='Sum to Sell'
              value={sumToSell}
              onChange={handleSellSumChange}
            />
          </div>
        }
        </div>

        <div className="crypto-foll-chart">
          <LineChart coinHistory={coinHistory} simplified />
        </div>

    </div>
  )
}

export default CryptoFollowed