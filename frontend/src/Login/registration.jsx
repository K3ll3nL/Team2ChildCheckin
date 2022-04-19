import { Autocomplete, Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Grid, Link, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'

import '../index.css'
import { useState } from 'react'
import { Box } from '@mui/system'
import ResponsiveAppBar from '../Components/NavBar'
export const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isEmployee,setIsEmployee] = useState(false);
    const [organization,setOrganization] = useState('');

    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }
    const handleOrganizationChange = (event,value,reason) => {
        setOrganization(value);

    }
    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleIsEmployee = () => {
        setIsEmployee(!isEmployee);
    }

    const handleButtonClick = () => {
        //TODO Send information to api and see if it is a valid name
        alert(`Username: ${username}\nPassword: ${password}\nEmail: ${email}\nIsEmployee: ${isEmployee}\nOrg: ${organization}`);
    }

    const orgs = [
        "KidsRUs",
        "We Watch Children",
        "Generic Daycare Name"
    ]

    console.log(username);
    return (

        <Box >
            <ResponsiveAppBar />
            <Grid container justifyContent="center" sx={{marginTop: 3}}>
                <Card>
                    <CardHeader title="Register"></CardHeader>
                    <CardContent>
                        

                            <form>
                                <TextField id="username" required label="Username" variant="outlined" onChange={handleUserChange} margin="normal" sx={{ display: "block" }}/>
                                <TextField id="password" required label="Password" className="" variant="outlined" type="password" margin="normal" sx={{ display: "block" }} onChange={handlePassChange} />
                                <TextField id="email" label="Email" className="" variant="outlined"  margin="normal" sx={{ display: "block" }} onChange={handleEmailChange} />
                                <FormGroup>
                                    
                                    <FormControlLabel control={<Checkbox onClick={handleIsEmployee}/>} label="Are you an employee?" />
                                    {isEmployee && <Autocomplete 
                                            disablePortal
                                            id="combo-box-demo"
                                            options={orgs}
                                            fullWidth
                                            sx={{marginBottom:10}}
                                            onInputChange={handleOrganizationChange}
                                            renderInput={(params) => <TextField {...params} label="Organization" />}
                                        />
                                    }
                                </FormGroup>
                            </form>
                            <Typography variant="subtitle2" sx={{ marginTop: 3, display: "inline" }}>Already have an account? </Typography>
                            <Link href="/Login">LOGIN</Link>
                        
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" fullWidth margin="normal" onClick={handleButtonClick}>Sign Up</Button>

                    </CardActions>
                </Card>
            </Grid>
        </Box>

    )


}