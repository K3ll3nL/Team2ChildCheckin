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
        displayName:"RoomList",
        link: "/RoomList"
    }
];


const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user,setUser] = React.useState(null);

    React.useEffect(() => {
        const token = sessionStorage.getItem("jwt")
        try {
            setUser(jwt_decoder(token))
        } catch (e) {

        }
    },[])
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleLogout = () => {
        sessionStorage.setItem("jwt","");
        navigate("/Login")
    }
    const handleDashboard = () => {
        if(user["is_employee"]) {
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
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        LOGO
                    </Typography>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Typography variant="h6" noWrap component="div">
                        Child Checkin
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link sx={{margin: 2}} href={page.link} color="inherit" underline="hover">{page.displayName}</Link>
                        ))}
                    </Box>
                 
                    {user && <Box sx={{ flexGrow: 0, justifyContent: 'flex-end' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            
                                <MenuItem key="dashboard" onClick={handleDashboard}>
                                    <Typography textAlign="center">Dashboard</Typography>
                                </MenuItem>
                                <MenuItem key="Logout" onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
