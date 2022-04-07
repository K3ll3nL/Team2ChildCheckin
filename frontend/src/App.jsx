import React, { useEffect, useState } from 'react';
import './App.css';
import ParentPage from './Components/Parent/parentPage';
import axios from 'axios';

import { LoginPage } from './Login/loginPage';
import { requirePropFactory } from '@mui/material';
import { RegistrationPage } from './Login/registration';
import ResponsiveAppBar from './Components/NavBar';


// React functional component
function App () {
 


  return (
   <RegistrationPage />
  );

}

export default App;
