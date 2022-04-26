import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import logo from '../img/Kid-Watchers-500.png'
import hamburgerMenu from '../img/hamburger-menu.png'
import jwt_decoder from 'jwt-decode'
const pages = [
    {
        displayName: "Login",
        link: "/Login"
    },
    {
        displayName: "Register",
        link: "/Registration"
    },
    {
        displayName: "Employees",
        link: "/EmployeeCard"
    },
    {
        displayName: "RoomList",
        link: "/RoomList"
    }
];


const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const token = sessionStorage.getItem("jwt")
        try {
            setUser(jwt_decoder(token))
        } catch (e) {

        }
    }, [])
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleLogout = () => {
        sessionStorage.setItem("jwt", "");
        navigate("/Login")
    }
    const handleDashboard = () => {
        if (user["is_employee"]) {
            navigate("/roomList")
        } else {
            navigate("/parentPage")
        }
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const theme = createTheme({
        palette: {
            primary: {
                light: '#819ca9',
                main: '#546e7a',
                dark: '#29434e',
                contrastText: '#ffffff',
            },
            secondary: {
                light: '#fffffb',
                main: '#d7ccc8',
                dark: '#a69b97',
                contrastText: '#000000',
            },
        },
    });

    return (
        <AppBar position="static" theme={theme}>
            <Container sx={{padding:0,marginLeft:0,marginRight:0,minWidth:"100%"}}  >
                <Toolbar disableGutters>
                    {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        LOGO
                    </Typography> */}
                    <img src={logo} style={{ maxHeight: "4rem" }} ></img>
                    {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography> */}
                    <Typography variant="h6" noWrap component="div">
                        Child Checkin
                    </Typography>
                    {
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {
                                !user && <Button sx={{ margin: 1 }} onClick={() => navigate('/Login')} theme={theme} color="secondary">Login</Button>
                            }
                            {
                                !user && <Button sx={{ margin: 1 }} onClick={() => navigate('/Registration')} theme={theme} color="secondary">Register</Button>

                            }
                            {
                                user && <Button sx={{ margin: 1 }} onClick={() => navigate(user.is_employee ? '/roomList' : '/parentPage')} theme={theme} color="secondary">Dashboard</Button>
                            }
                            {

                                (!user || !user.is_employee )&& <Button sx={{ margin: 1 }} onClick={() => navigate('/FindDaycare')} theme={theme} color="secondary">Our Daycares</Button>
                            }
                        </Box>

                    }

                    {<Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'flex', md: 'none' } }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <img alt="Remy Sharp" src={hamburgerMenu} style={{ maxHeight: "2.5rem" }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                user && <MenuItem key="dashboard" onClick={handleDashboard}>
                                    <Typography textAlign="center">Dashboard</Typography>
                                </MenuItem>

                            }
                            {
                                user && <MenuItem key="Logout" onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>

                            }
                            {
                                !user && <MenuItem key="Login" onClick={() => navigate('/Login')}>
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                            }
                            {
                                !user && <MenuItem key="Register" onClick={() => navigate('/Registration')}>
                                    <Typography textAlign="center">Register</Typography>
                                </MenuItem>
                            }
                                <MenuItem key="Find Daycares" onClick={() => navigate('/FindDaycare')}>
                                    <Typography textAlign="center">Our Daycares</Typography>
                                </MenuItem>

                        </Menu>
                    </Box>}
                    {
                        user && <Button variant="outlined" theme={theme} color="secondary" sx={{ display: { xs: 'none', md: 'flex' } }} onClick={handleLogout} >Logout</Button>

                    }

                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
