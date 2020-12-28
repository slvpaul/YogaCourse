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
import { Link, Redirect } from 'react-router-dom';
import { useStyles } from '../styles/styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { useState } from 'react';

export default function SignUp(props) {
    const classes = useStyles(props);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    

    async function handleSubmit(event) {
        event.preventDefault();
        const body = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value
        }

        const res = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (res.status === 201) {
            const userObj = await res.json();
            res.send(userObj);
            setSuccess(true);
            return <Redirect to='signIn' />
        } else {
            setErrorMsg(await res.text());
        }
    };

    async function handleClick() {
        setLoading(true);
        if(success === true) {
            setLoading(false);
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
                        Sign up
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
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