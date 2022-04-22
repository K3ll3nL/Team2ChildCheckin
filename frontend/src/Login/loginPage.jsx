import { Button, Card, CardActions, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'

import '../index.css'
import { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import ResponsiveAppBar from '../Components/NavBar'
import { login } from '../api/parentApi'
import jwt_decoder from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidUser, setInvalidUser] = useState(false);
    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }
    const navigate = useNavigate();
    const handleButtonClick = () => {
        if (!username) {
            alert("Please enter a username!")
        } else if (!password) {
            alert("Please enter a password!")
        } else {
            let user = {
                username: username,
                password: password,
            }

            let jwt = {};

            login(user).then(x => {
                setInvalidUser(false);
                jwt = x;
                console.log(jwt);

                console.log(jwt_decoder(jwt.token));
                sessionStorage.setItem("jwt", jwt.token);
                const _user = { ...jwt_decoder(jwt.token) };
                if (_user["is_employee"]) {
                    navigate("/roomList")
                } else {
                    navigate("/parentPage")
                }
            }).catch(() => {
                setInvalidUser(true);
            })
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("jwt");
        if (token) {
            try {

                if (jwt_decoder(token).is_employee) {
                    navigate("/roomList")
                } else {
                    navigate("/parentPage")
                }
            } catch (error) {

            }
        }

    }, [])

    return (
        <Box >
            <ResponsiveAppBar></ResponsiveAppBar>

            <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
                <Card>
                    <CardHeader title="Login"></CardHeader>
                    <CardContent>

                        <form>
                            <TextField id="username" label="Username" variant="outlined" onChange={handleUserChange} margin="normal" />
                            <TextField id="password" label="Password" className="" variant="outlined" type="password" margin="normal" sx={{ display: "block" }} onChange={handlePassChange} error={invalidUser} helperText={invalidUser ? "Incorrect username or password" : ""} />
                        </form>
                        <Typography variant="subtitle2" sx={{ marginTop: 3, display: "inline" }}>Need an account? </Typography>
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