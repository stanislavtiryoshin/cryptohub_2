import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'
import api from '../../api/coins'

import { StarOutlined, StarFilled } from '@ant-design/icons'

const CryptoCard = ({ followedCoins, uuid, rank, name, iconUrl, symbol, price, marketCap, change, id}) => {

  const [isFollowed, setIsFollowed] = useState()

  useEffect(() => {
    setIsFollowed(followedCoins.some(coin => coin.uuid === uuid))
  })

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
    } else {
      await api.delete(`/coins/${id}`)
    }
  }

  const [changeClass, setChangeClass] = useState('neutr')

  useEffect(() => {
    if (parseInt(change) >= 1) setChangeClass('posit')
    else if (parseInt(change) <= -1) setChangeClass('negat')
    else setChangeClass('neutr')
  }, [])

  return (
    <div className='crypto-container'>
      <Link to={`/crypto/${uuid}`} key={uuid}>
        <div className="crypto-card-wrap">
          <div className="crypto-card">
            <div className="crypto-card-heading">
              <h3>
                {rank}. <font>{name}</font> 
              </h3>
              <img src={iconUrl} alt="coin icon" />
            </div>
            <p>{symbol}</p>
            <p >Price: ${millify(price, {precision: 3})}</p>
            <p>Market Cap: {millify(marketCap)}</p>
            <p>Daily Change: <font className={changeClass}>{millify(change)}%</font></p>
          </div>
        </div>
      </Link>
      <button className='btn-follow' onClick={() => followCoin()}>
        {
          isFollowed && <StarFilled style={{color: 'rgb(255, 208, 0)', fontSize: '280%'}} /> 
        }
        {
          !isFollowed && <StarOutlined  style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: '280%'}} />
        }
      </button>
    </div>
  )
}

export default CryptoCard