import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,
         Switch,
         Route,
        } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Home from './components/home';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Profile from './components/profile';
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
        backgroundColor: '#f0ecdf'

    },
},
container: {
    [theme.breakpoints.down('sm')] : {
        width: '75vw',
        height: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Roboto',

    },

},
}));


export default function App() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);

  function getUser() {
    axios.get('http://localhost:8080/user', { withCredentials: true }).then(response => {
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
      <Box className={classes.root}>
      <Container className={classes.container}>
       <Navbar 
       className={classes.nav} 
       setLoggedInChild={setLoggedIn}
       isLoggedIn={loggedIn}/>

        <Switch>
            <Route path='/profile'>
              <Profile isLoggedIn={loggedIn}/>
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
                <Home isLoggedIn={loggedIn}/>
            </Route>
        </Switch>
        </Container>
        </Box>
</Router>
);
}
