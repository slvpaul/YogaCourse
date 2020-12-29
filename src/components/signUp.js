import React from 'react';
import { 
    Avatar, 
    Button, 
    CssBaseline, 
    TextField, 
    Grid, 
    Box, 
    Typography, 
    Container,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { useStyles } from '../styles/styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { useState, useEffect } from 'react';

export default function SignUp(props) {
    const classes = useStyles(props);
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const body = {
            email: event.currentTarget.email.value, 
            password: event.currentTarget.password.value
        };
        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
         if(response.status === 200) {
         return response.json();
         } else {
             setErrorMsg('Could not create account');
         };
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <GroupAddIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    {errorMsg ? <Typography>{errorMsg}</Typography> : null}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                helperText="Please enter your email address"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                helperText="Please enter a password"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                        Sign up
                        </Button>
                        <Grid item>
                            <Link to='signIn'>
                            <Typography className={classes.gosignin}>Already have an account? Sign in</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
    }