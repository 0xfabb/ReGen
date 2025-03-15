import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './Pages/Landing';
import  SignUp  from './Pages/SignUp';
import  Login  from './Pages/Login';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
