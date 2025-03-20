import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './Pages/Landing';
import  SignUp  from './Pages/SignUp';
import  Login  from './Pages/Login';
import Home from './Pages/Dashboard';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
