import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import theme from '../styles/theme';
import { 
    Button, 
    Container, 
    Menu, 
    MenuItem, 
    IconButton, 
    AppBar, 
    Toolbar, 
    ButtonGroup,
    Box,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import axios from 'axios';


const useStyles = makeStyles(() => ({
    nav: {
        [theme.breakpoints.down('sm')] : {
            display: "none"
      
        },
        
    },
    mobileNav: {
        [theme.breakpoints.up('md')] : {
            display: 'none'
        }
    },

    appBarContainer: {
        backgroundColor: theme.palette.secondary.main,

    },

    button: {
        color: 'white',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        },
    },

    mobileButton: {
        '&:hover': {
            color: theme.palette.secondary.main
        }

    },
    grow: {
        flex: 1
    },
    navIcon: {
        height: '40px',
    }
}))


export default function Navbar({ isLoggedIn, setLoggedInChild }) {
    const classes = useStyles();
    const history = useHistory();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleLogout(event) {
        event.preventDefault()
        axios.delete('http://protected-peak-08686.herokuapp/signout', { withCredentials: true}).then(response => {
            if (response.status === 204) {
                setLoggedInChild(false);
                history.push('/');
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }
const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
};
const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
};
 const mobileMenuId = 'mobile-menu';
 const renderMobileMenu = 
    <>
    <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
    >
        <MenuItem><Button className={classes.mobileButton}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Home</Link></Button></MenuItem>
        {!isLoggedIn && <MenuItem><Button className={classes.mobileButton}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='signUp'>Sign up</Link></Button></MenuItem>}
        {!isLoggedIn && <MenuItem><Button className={classes.mobileButton}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='signIn'>Sign In</Link></Button></MenuItem>}
        {isLoggedIn && <MenuItem><Button className={classes.mobileButton} onClick={handleLogout}>Log out</Button></MenuItem>}


    </Menu>
    </>

    return (
        <>
    <Container className={classes.nav}>
        <AppBar className={classes.appBarContainer}>
         <Toolbar>
          <img className={classes.navIcon} src='/images/navIcon.png' alt='navIcon' />

          <Box className={classes.grow} />
   
            <ButtonGroup disableElevation size='small'>

       
            <Button 
            size='large' 
            variant='contained'
            className={classes.button}
            >
                <Link style={{ textDecoration: 'none',color: 'inherit' }} to='/'>Home</Link>
            </Button>
       
    
            {!isLoggedIn && <Button 
            size='large' 
            variant='contained'
            className={classes.button}
            >
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='signUp'>Sign up</Link>
            </Button>}
     
  
            {!isLoggedIn && <Button 
            size='large' 
            variant='contained'
            className={classes.button}
            >
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='signIn'>Sign in</Link>
            </Button>}
  
    
           {isLoggedIn && <Button 
            size='large' 
            variant='contained'
            className={classes.button} 
            onClick={handleLogout}>Log out</Button>}
    
   
                </ButtonGroup>
                </Toolbar>
                </AppBar>
    </Container>


<Container className={classes.mobileNav}>
    <AppBar className={classes.appBarContainer}>
        <Toolbar>
        <img className={classes.navIcon} src='/images/navIcon.png' alt='navIcon' />
            <Box className={classes.grow} />
                <IconButton
                    aria-label='show more'
                    aria-controls={mobileMenuId}
                    aria-haspopup='true'
                    onClick={handleMobileMenuOpen}
                    color='inherit'
                >
                    <MoreIcon />
                </IconButton>
            <Box className={classes.appBarSeparator} />
            {renderMobileMenu}
        </Toolbar>
    </AppBar>
</Container>
</>
)
}