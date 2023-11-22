import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import View from './views/View'
import Add from './views/Add'

function App() {

  return (
    <Routes>
      <Route path="/" element={<View />} />
      <Route path="/:id" element={<Add />} />
    </Routes>
  )
}

export default App
