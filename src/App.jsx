import { useState } from 'react'
import './App.css'
import Nav from './component/nav/Nav'
import Home from './pages/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CountryDetail from './pages/countryDetail/CountryDetail'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/countrydetail/:countryname' element={<CountryDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
