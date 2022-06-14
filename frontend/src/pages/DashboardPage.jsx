import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import CryptoFollowed from '../components/CryptoFollowed/CryptoFollowed'
import CryptoHold from '../components/CryptoHold/CryptoHold'
import DashPieChart from '../components/PieChart/DashPieChart'

import { ReloadOutlined } from '@ant-design/icons'

import api from '../api/coins'

function DashboardPage({followedCoins}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/home')
  }

  /** Followed Coins **/

  const [displayedCoins, setDisplayedCoins] = useState([])

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

  displayedCoins?.sort((coin1, coin2) => {return coin1.rank - coin2.rank})

  /* Held Coins */

  const [heldCoins, setHeldCoins] = useState([])

  const retrieveHeldCoins = async () => {
    const response = await api.get("/held_coins")
    return response.data
  }

  useEffect(() => {
    const getHeldCoins = async () => {
      const allHeldCoins = await retrieveHeldCoins()
      if (allHeldCoins) setHeldCoins(allHeldCoins)
    }
    getHeldCoins()
  }, [])

  const [invested, setInvested] = useState([])

  useEffect(() => {
    if (heldCoins) setInvested(heldCoins.reduce((acc, obj) => acc + obj.sum, 0))
  })

  /* Fiat */

  const [fiat, setFiat] = useState([])

  const retrieveFiat = async () => {
    const response = await api.get("/fiat")
    return response.data
  }

  /* Initial Funds */

  const [initialFunds, setInitialFunds] = useState('')

  useEffect(() => {
    const getFiat = async () => {
      const allFiat = await retrieveFiat()
      if (allFiat) setFiat(allFiat[0].fiat)
    }
    getFiat()
  }, [initialFunds])

  const handleFundsChange = (e) => {
    setInitialFunds(parseInt(e.target.value))
  }

  const submitInitialFunds = async () => {
    await api.put("/fiat/0", {
      id: 0,
      fiat: initialFunds
    })
    await api.put("/fiat/1", {
      id: 1,
      fiat: initialFunds
    })
    const fiatData = await api.get("/fiat")
    let currFiatData = fiatData?.data[0].fiat
    setFiat(currFiatData) 
  }

  /* Reset Fiat */

  const handleReset = async () => {
    await api.put("/fiat/0", {
      id: 0,
      fiat: 0
    })
    await api.put("/fiat/1", {
      id: 1,
      fiat: 0
    })
    await api.delete("/held_coins")
  }

  /* Refresh */

  const refresh = async () => {
    const fiatData = await api.get("/fiat")
    let currFiatData = fiatData?.data[0].fiat
    setFiat(currFiatData)
    window.location.reload(false)
  }

  const updateHeldCoins = async () => {
    const newHeldCoins = await api.get("/held_coins")
    if (newHeldCoins) setHeldCoins(newHeldCoins.data)
  }

  const updateFiat = async () => {
    const newFiat = await api.get("/fiat/0")
    if (newFiat) setFiat(newFiat)
  }

  const [initialFundsData, setInitialFundsData] = useState(0)

  useEffect(() => {
    const getInitialFunds = async () => {
      const initial = await api.get("/fiat/1")
      if (initial) setInitialFundsData(initial?.data?.fiat)
    }
    getInitialFunds()
  })

  heldCoins?.sort((coin1, coin2) => {return coin1.rank - coin2.rank})

  const renderHeldCoins = heldCoins?.map((coin, index) => {
      return (
          <CryptoHold 
          updateHeldCoins={updateHeldCoins}
          rank={coin.rank}
          symbol={coin.symbol}
          amount={coin.amount}
          price={coin.price}
          sum={coin.sum}
          id={coin.id}
          key={index}
        />
      )
    }
  )

  return (
    <section className='dsh-page'>
      <section className='welcome-section' >
        <h1>Welcome, {user && user.name}!</h1>
        <button className='btn-pink-solid' onClick={onLogout}>Logout</button>
      </section>

      <div className="held-chart-box">
        {
          heldCoins && <div className="held-chart"><DashPieChart heldCoins={heldCoins} invested={invested} /></div>
        }

        <section className='held-section'>
          <h2>Your held coins: 
            <button className="btn-refresh" onClick={() => refresh()}>
              <ReloadOutlined style={{color: 'white', fontSize: '80%'}} />Refresh
            </button>
          </h2>
          <div className="held-box">
            <div className="held-table">
              <div className="held-table-head">
                <p>Coin</p>
                <p>Amount</p>
                <p>Price Change</p>
                <p>Sum Invested</p>
                <p>Current Value</p>
                <p>Value Change</p>
              </div>
            {renderHeldCoins}
            </div>
          </div>
        </section>
      </div>

      <section className="totals-section">
        <h2>Your Totals:</h2>
        <div className="totals-box">
          <p>Current Fiat: ${parseInt(fiat)}</p>
          <p>Total Invested: ${heldCoins.reduce((acc, obj) => acc + obj.sum, 0)}</p>
        </div>
        <div className="totals-input">
        <input 
          className='sum-input'
          type="number"
          placeholder='Initial Funds'
          value={initialFunds}
          onChange={handleFundsChange}
        />
        <button className='btn-submit-funds btn-pink-solid' onClick={submitInitialFunds}>Submit</button>
        <button className='btn-reset btn-pink-solid' onClick={handleReset}>Reset</button>
        </div>
      </section>

      <section className="followed-section">
        <h2>Your Favorite Coins:</h2>
        <div className="followed-box">
          {displayedCoins?.map((currency, index) => {
              return (
                <CryptoFollowed
                  updateFiat={updateFiat}
                  updateHeldCoins={updateHeldCoins}
                  followedCoins={followedCoins}
                  heldCoins={heldCoins}
                  uuid={currency.uuid}
                  rank={currency.rank}
                  name={currency.name}
                  iconUrl={currency.iconUrl}
                  symbol={currency.symbol}
                  price={currency.price}
                  marketCap={currency.marketCap}
                  change={currency.change}
                  id={currency.id}
                  key={index}
                />
              )
            })
          }
        </div>
      </section>

    </section>
  )
}

export default DashboardPage
