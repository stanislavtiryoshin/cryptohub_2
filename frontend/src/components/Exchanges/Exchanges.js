import React, { useState, useEffect } from 'react'
import Accordion from './Accordion'
import Loader from '../Loader/Loader'

import { useGetExchangesQuery } from '../../services/cryptoExchangesApi'

import { CloseSquareOutlined } from '@ant-design/icons'
import './Exchanges.css'

const Exchanges = ({ simplified }) => {
  const count = simplified ? 5 : 20
  const [searchTerm, setSearchTerm] = useState('')
  const [exchanges, setExchanges] = useState()
  const {data: exchangesList, isFetching} = useGetExchangesQuery(count)
  
  useEffect(() => {
    setExchanges(exchangesList)
    const filteredData = exchangesList?.filter(exch => exch.id.includes(searchTerm))
    setExchanges(filteredData)
  }, [exchangesList, searchTerm])

  if (isFetching) return <Loader />

  return (
    <div className="exchanges-box">
      {!simplified &&
      <>
      <h1>Top 100 Exchanges</h1>
        <div className="search">
          <input type="text" placeholder='Search exchanges' id="search-bar" onChange={e => setSearchTerm(e.target.value.toLocaleLowerCase())}/>
          <span 
            className="clear-btn"
            onClick={() => {
              setSearchTerm('')
              document.querySelector('#search-bar').value = ''
            }}
          >
            <CloseSquareOutlined style={{fontSize: '250%'}}/>
          </span>
        </div>
        </>
      }
      {exchanges?.slice(0, count).map((item, ind) => {
        return (
          <Accordion rank={item.trust_score_rank} title={item.name} content={item} key={ind}/>
        )
      })}
    </div>
  )
}

export default Exchanges