import React from 'react';
import { BrowserRouter as Router,
         Switch,
         Route,
         Link
        } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import { useStyles } from './styles/styles';
import Home from './components/home';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Profile from './components/profile';
import Settings from './components/settings';

export default function App(props) {
  const classes = useStyles(props);
  return (
    <Router>
      <Box className={classes.root}>
      <Container className={classes.container}>
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='signUp'>Sign Up</Link>
                </li>
                <li>
                    <Link to='signIn'>Sign In</Link>
                </li>
                <li>
                    <Link to='signOut'>Sign Out</Link>
                </li>
            </ul>
        </nav>

        

        <Switch>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/settings'>
              <Settings />
            </Route>
            <Route path='/signUp'>
                <SignUp />
            </Route>
            <Route path='/signIn'>
                <SignIn />
            </Route>
            <Route path='/signOut'>
              <SignOut />
            </Route>
            <Route path='/'>
                <Home />
            </Route>
        </Switch>
        </Container>
        </Box>
</Router>
);
}

function SignOut() {
return <h2>Sign Out</h2>
}
