import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/signup" element={<div>Signup page</div>}/>
        <Route path="/login" element={<div>Login page</div>}/>
        <Route path="/cart" element={<div>Cart page</div>}/>
        <Route path="/checkout" element={<div>Checkout page</div>}/>
        <Route path="/product/:id" element={<div>Product page</div>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
