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
    CircularProgress
} from '@material-ui/core';
import { useStyles } from '../styles/styles';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { useState, useEffect } from 'react';
import { useUser } from '../lib/hooks';
import { Link, Redirect } from 'react-router-dom';

export default function SignIn(props) {
    const classes = useStyles(props);
    const [user, { mutate }] = useUser();
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            return (
                <Redirect to='/profile' />
            )
        } 
    })


    async function handleSubmit(event) {
        event.preventDefault();
        const body = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value
        };

        const res = await fetch('/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        if (res.status === 200) {
            const userObj = await res.json();
            mutate(userObj);
            setSuccess(true);
        } else {
            setErrorMsg('Incorrect email or password. Try again!')
        }
    };

    async function handleClick() {
        setLoading(true);
        if(success === true) {
            setLoading(false);
        };
    };


    return (
        <Container component='main' maxWidth="xs">
            <CssBaseline />
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    {errorMsg ? <Typography color='red'>{errorMsg}</Typography> : null}
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
                            onClick={handleClick}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                        Sign in
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        <Grid item>
                            <Link to='signUp'>
                            <Typography className={classes.gosignin}>Don't have an account? Sign up</Typography>
                            </Link>
                        </Grid>
                        </Grid>
        </form>
        </Box>
        </Container>
    )
}