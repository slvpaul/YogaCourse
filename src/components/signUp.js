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
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { useState } from 'react';
import axios from 'axios';
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
        [theme.breakpoints.up('sm')] : {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'

        },
    },

    avatar: {
            margin: theme.spacing(1),
            color: 'white',
            backgroundColor: theme.palette.secondary.main
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },

    submit : {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        },
    },

    gosignin: {
        fontSize: '12px',
    },
    
    alert: {
        color: 'red',
        marginTop: '100px',
        fontSize: '1.5em'
    }
}));

export default function SignUp({isLoggedIn}) {
    const classes = useStyles();
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(null);
    const [accountCreated, setAccountCreated] = useState(null);
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        const body = {
            name: event.currentTarget.name.value,
            email: event.currentTarget.email.value, 
            password: event.currentTarget.password.value
        };
        axios.post('/signup', {
            name: body.name,
            email: body.email,
            password: body.password
        }).then(response => {
            console.log(response)
            if(!response.data.errmsg) {
                setSuccess(true);
                setTimeout(() => {
                    setAccountCreated(true);
                    history.push('/signIn');
                }, 3000);
            } else {
                console.log('Email already used')
            }
        }).catch(error => {
            setErrorMsg('error');
        })
    };

    return (
        <Container component='main' maxWidth='xs'>
            {success && <Typography className={classes.alert}>Account created successfully! Please sign in</Typography>}
            {accountCreated && <Redirect to='/signIn' />}
            {isLoggedIn ? <Redirect to='/dashboard' /> : 
            <>
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
                                helperText="Please enter your name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>
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
            </>
}
        </Container>
    )
    }