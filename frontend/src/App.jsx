import React, { useEffect, useState } from 'react';
import './App.css';
import { ParentPage } from './Parent/parentPage';
import  ResponsiveAppBar from './NavBar';
import axios from 'axios';

// React functional component
function App () {
 

  return <>
    {/* To look at example parent page comment/uncomment following line */}
    <ResponsiveAppBar/>
    <ParentPage/>
  </>;
  
}

export default App;
