import React, {useState, useEffect, useCallback} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage.jsx';
import CurrenciesPage from './pages/CurrenciesPage.jsx';
import ExchangesPage from './pages/ExchangesPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import CryptoDetailsPage from './pages/CryptoDetailsPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage';

import api from './api/coins'

import './App.css';

function App() {

  const [followedCoins, setFollowedCoins] = useState([])

  const retrieveFollowedCoins = async () => {
    const response = await api.get("/coins")
    return response.data
  }

  useEffect(() => {
    const getFollowedCoins = async () => {
      const allFollowedCoins = await retrieveFollowedCoins()
      if(allFollowedCoins) setFollowedCoins(allFollowedCoins)
    }
    getFollowedCoins()
  }, [])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/home' element={<HomePage followedCoins={followedCoins} />} />
          <Route path='/currencies' element={<CurrenciesPage followedCoins={followedCoins} />} />
          <Route path='/exchanges' element={<ExchangesPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/crypto/:coinId' element={<CryptoDetailsPage followedCoins={followedCoins} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<DashboardPage followedCoins={followedCoins} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
