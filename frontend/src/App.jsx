import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { LoginPage } from './Login/loginPage';
import { requirePropFactory } from '@mui/material';
import { RegistrationPage } from './Login/registration';


// React functional component
function App () {
 

  return (
   <RegistrationPage />
  );
}

export default App;
