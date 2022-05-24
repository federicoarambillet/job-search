import { Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import './App.css';

//Components
import Home from './pages/Home/Home';
import SearchJob from './pages/SearchJob/SearchJob.jsx'
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import ViewDetails from './pages/ViewDetails/ViewDetails.jsx';
import Navbar from './commons/components/Navbar/Navbar.jsx';
import Footer from './commons/components/Footer/Footer.jsx';
import ValidateToken from './commons/components/ValidateToken/ValidateToken.jsx';
import EmployerApplication from './pages/EmployerApplication/EmployerApplication';

function App() {

    //current routing
    const location = useLocation();

    return (
        <>
            <ValidateToken />
            {location.pathname !== "/login" && <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/search' element={<SearchJob />} />
                <Route path='/register' element={<Register />} />
                <Route path='/view/:id' element={<ViewDetails />} />
                <Route path='/employer' element={<EmployerApplication />} />
                <Route path='*' element={<Home />} />
            </Routes>
            {location.pathname !== "/login" && <Footer />}
        </>
    );
}

export default App;