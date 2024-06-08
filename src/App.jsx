import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import TextGenrate from './TextGenrate'
import Text from './Text'
import StatDisplay from './components/stat/StatDisplay'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' >
        <Route index element={<TextGenrate/>} />
        <Route path='text' element={<Text />}></Route>
        <Route path='detailed-stat' element ={<StatDisplay/>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
