import React, { useState } from 'react';
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
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import theme from '../styles/theme';

const useStyles = makeStyles(() => ({
    paper: {
        [theme.breakpoints.down('sm')] : {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'

        },
    },

    avatar: {
        [theme.breakpoints.down('sm')] : {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main

        },
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },

    submit : {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main
    },

    gosignin: {
        fontSize: '12px',
    }
}))


export default function SignIn({ isLoggedIn, setLoggedInChild }) {
    const classes = useStyles();
    const [errorMsg, setErrorMsg] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();

        const body = {
            email: event.currentTarget.email.value, 
            password: event.currentTarget.password.value
        }

        axios.post('http://localhost:8080/signin', {
            email: body.email,
            password: body.password
        }, { withCredentials: true })
        .then(response => {
            if(response.status === 200) {
                setLoggedInChild(true);
                window.location.reload();
            }
        }).catch(error => {
            setErrorMsg('error');
        })

    };

    
    return (
        <Container component='main' maxWidth="xs">
        {isLoggedIn ? <Redirect to='profile' /> : 
        <>
            <CssBaseline />
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
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
                        Sign in
                        </Button>
                        <Grid item>
                            <Link to='signUp'>
                            <Typography className={classes.gosignin}>Don't have an account? Sign up</Typography>
                            </Link>
                        </Grid>
                        </Grid>
        </form>
        </Box>
        </>
}
        </Container>
    )
}