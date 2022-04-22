import { Autocomplete, Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Grid, Link, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'

import '../index.css'
import { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import ResponsiveAppBar from '../Components/NavBar'
import { getOrgs } from '../api/organizationsApi'
import { Navigate, useNavigate } from 'react-router-dom'
import { createUser } from '../api/parentApi'
export const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isEmployee,setIsEmployee] = useState(false);
    const [organization,setOrganization] = useState('');
    const navigate = useNavigate();

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
        if(!username) {
            alert("Please enter a username!")    
        } else if(!password) {
            alert("Please enter a password!")
        } else if(isEmployee && !organization) {
            alert("Please select an organization!")
        } else {
            // alert(`Username: ${username}\nPassword: ${password}\nEmail: ${email}\nIsEmployee: ${isEmployee}\nOrg: ${organization}`);
            let user = {
                username: username,
                password: password,
                email: email,
                is_employee: isEmployee,
                center_id: fullOrgs.find(x => x["name"] === organization)["center_id"]
            }
            let jwt = {};
            createUser(user).then(x => {
                x=jwt;
                console.log(jwt)
            });
            
            
        //    navigate("/Login");
        }
    }

    const [orgs,setOrgs] = useState([]);
    const [fullOrgs,setFullOrgs] = useState([]);
    let _orgs = [];
    let _fullOrgs = [];
    useEffect(() => {
        //will pass in parent id to get kids
        getOrgs().then(x => {
        //    debugger;
           x.data.map(val => {
               _fullOrgs.push(val);
               _orgs.push(val["name"])
           })
           console.log(_orgs);
           setOrgs(_orgs);
           setFullOrgs(_fullOrgs);
        });
    }, []);

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
                                    {
                                    isEmployee && <Autocomplete 
                                            
                                            
                                            id="combo-box-demo"
                                            options={orgs}
                                            fullWidth
                                            sx={{marginBottom:2}}
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