import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import View from './View';
import Add from './Add';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/view/:id" element={<View/>}/>
      <Route path="/update/:id" element={<Add/>}/>
      <Route path="/add" element={<Add/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App