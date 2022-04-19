import React, { useEffect, useState } from 'react';
import './App.css';
import ParentPage from './Components/Parent/parentPage';
import axios from 'axios';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { LoginPage } from './Login/loginPage';
import { requirePropFactory } from '@mui/material';
import { RegistrationPage } from './Login/registration';
import ResponsiveAppBar from './Components/NavBar';
import { EmployeeCard } from './Components/models/Employee/EmployeeCard';


// React functional component
function App () {
 


  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Registration' element={<RegistrationPage />} />
          <Route path='/EmployeeCard' element={<EmployeeCard />} />
          <Route path='*' element={<ResponsiveAppBar />} />
        </Routes>
      </Router>
    </div>

  );

}

export default App;