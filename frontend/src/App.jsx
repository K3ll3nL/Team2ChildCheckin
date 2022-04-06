import React, { useEffect, useState } from 'react';
import './App.css';
import ParentPage from './Components/Parent/parentPage';
import axios from 'axios';
import ResponsiveAppBar from './Components/NavBar';
import { DaycareBanner } from './Components/Parent/daycareBanner';

// React functional component
function App () {
 

  return <>
    {/* To look at example parent page comment/uncomment following line */}
    <ResponsiveAppBar />
    <DaycareBanner/>
    <ParentPage />
  </>;
  
}

export default App;
