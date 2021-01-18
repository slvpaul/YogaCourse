import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,
         Switch,
         Route,
         Redirect,
        } from 'react-router-dom';
import { Container, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Home from './components/home';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Dashboard from './components/dashboard';
import Settings from './components/settings';
import axios from 'axios';
import Navbar from './components/navbar';
import theme from './styles/theme';

const useStyles = makeStyles(() => ({
  root: {
    [theme.breakpoints.down('sm')] : {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4e8f0',

    },
    [theme.breakpoints.up('sm')] : {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e4e8f0'

  },
},
container: {
    [theme.breakpoints.down('sm')] : {
        width: '75vw',
        height: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Roboto',

    },
    [theme.breakpoints.up('sm')] : {
      width: '75vw',
      height: '75vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: 'Roboto',

  }
},
nav : {
    position: 'top'
},
hidden: {
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}
}));


export default function App() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);

  function getUser() {
    axios.get('https://protected-peak-08686.herokuapp/user', { withCredentials: true }).then(response => {
      if(response.data.user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
  }

  useEffect(() => {
    getUser();
  });

  return (
    
    <Router>
      {loggedIn && <Redirect to='/dashboard' />}
       <Navbar 
       className={classes.nav} 
       setLoggedInChild={setLoggedIn}
       isLoggedIn={loggedIn} 
       />
      <Box className={classes.root}>
      <Container className={classes.container}>
      

        <Switch>
            <Route path='/dashboard'>
              <Dashboard isLoggedIn={loggedIn}/>
            </Route>
            <Route path='/settings'>
              <Settings isLoggedIn={loggedIn} />
            </Route>
            <Route path='/signUp'>
                <SignUp  
                isLoggedIn={loggedIn}
                />
            </Route>
            <Route path='/signIn'>
                <SignIn 
                setLoggedInChild={setLoggedIn} 
                isLoggedIn={loggedIn}
                />
            </Route>
            <Route path='/'>
                <Grid container>
                <Grid item md={6} sm={12} xs={12} ><Home isLoggedIn={loggedIn}/></Grid>
                {loggedIn ? <Dashboard /> : <Grid className={classes.hidden} item md={6}><SignUp /></Grid>}
                </Grid>
            </Route>
        </Switch>
        </Container>
        </Box>
</Router>
);
}
