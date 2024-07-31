import './App.css';
import Header from './Components/Header';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer></ToastContainer>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
