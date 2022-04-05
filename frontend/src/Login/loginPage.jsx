import {  Button, Grid } from '@mui/material'
import TextField from '@mui/material/TextField'

import '../index.css'
import { useState } from 'react'
import { Box } from '@mui/system'
export const LoginPage = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    
    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }

    const handleButtonClick = () => {
        //TODO Send information to api and see if it is a valid name
    }
    console.log(username);
    return (
        
        <Box >
            <h1>Login</h1>
            <Grid container justifyContent="center">
                <form>
                    <TextField id="username" label="Username" variant="outlined" onChange={handleUserChange}/>
                    <TextField id="password" label="Password" variant="outlined" type="password" onChange={handlePassChange}/>
                    <Button variant="contained">Login</Button>
                </form>
            </Grid>
        </Box>

    )


}