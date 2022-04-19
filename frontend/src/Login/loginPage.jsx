import { Button, Card, CardActions, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'

import '../index.css'
import { useState } from 'react'
import { Box } from '@mui/system'
import ResponsiveAppBar from '../Components/NavBar'
export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }

    const handleButtonClick = () => {
        //TODO Send information to api and see if it is a valid name
        alert(`Username: ${username}\nPassword: ${password}`);
    }


    console.log(username);
    return (
        <Box >
            <ResponsiveAppBar></ResponsiveAppBar>

            <Grid container justifyContent="center" sx={{marginTop: 5}}>
                <Card>
                    <CardHeader title="Login"></CardHeader>
                    <CardContent>

                        <form>
                            <TextField id="username" label="Username" variant="outlined" onChange={handleUserChange} margin="normal" />
                            <TextField id="password" label="Password" className="" variant="outlined" type="password" margin="normal" sx={{ display: "block" }} onChange={handlePassChange} />
                        </form>
                        <Typography variant="subtitle2" sx={{marginTop: 3, display: "inline"}}>Need an account? </Typography>
                        <Link href="/Registration">SIGN UP</Link>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" fullWidth margin="normal" onClick={handleButtonClick}>Login</Button>

                    </CardActions>
                </Card>
            </Grid>
        </Box>

    )


}