import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctionItems } from './store/slice/saleSlice'
function App() {


  return (
    <>
    <Header/>
    
    </>
  )
}

export default App
