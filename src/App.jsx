import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import GamePage from './components/GamePage'
import './App.css'
import BoxPanel from './BoxPanel'
import TextGenrate from './TextGenrate'
import Text from './Text'
import ControlBox from './ControlBox'
import StatDisplay from './components/stat/StatDisplay'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<ControlBox/>} />
      <Route path='/generate' >
        <Route index element={<TextGenrate/>} />
        <Route path='text' element={<Text />}></Route>
        <Route path='detailed-stat' element ={<StatDisplay/>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
