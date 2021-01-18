import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Button, ButtonGroup, Grid } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LessonOne from './lessonOne';
import LessonTwo from './lessonTwo';
import LessonThree from './lessonThree';
import CompletedCourse from './courseCompleted';
import { makeStyles } from '@material-ui/styles';
import theme from '../styles/theme';

const useStyles = makeStyles(() => ({
    parentContainer: {
        [theme.breakpoints.down('sm')]: {
        direction: 'column',
        height: '500px',
        width: '200px',
        alignItems: 'center',
        justify: 'flex-start',
        flexWrap: 'wrap'
    },
        [theme.breakpoints.up('md')]: {
        direction: 'column',
        height: '50vh',
        maxWidth: '60vw',
        alignItems: 'center',
        justify: 'flex-start'

    },
},
    contentContainer: {
        [theme.breakpoints.down('sm')]: {
            height: '400px'
        },
        height: '50vh',
        width: 'auto',
        direction: 'column',
        overflow: 'scroll',
        textAlign: 'left'
    },
    

    resumeButton: {
        color: 'white',
        backgroundColor: theme.palette.secondary.main,
        margin: '10px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    buttons: {
        color: 'white',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        },
    },
    buttongroup: {
        marginTop: '10px'
    }
}))


export default function Dashboard({ isLoggedIn }) {
    const classes = useStyles();
    const [userEmail, setUserEmail] = useState('');
    const [userLesson, setUserLesson] = useState();
    const [startedLesson, setStartedLesson] = useState(null);
    
    useEffect(() => {
        let isMounted = true;
        axios.get('/user', {withCredentials: true})
        .then(response => {
            if(isMounted) {
                if(response.data.user) {
                setUserEmail(response.data.user.email);
            } 
        } return null;})
        .catch(err => console.log(err));
        return () => { isMounted = false };
    }, []);

    async function nextLesson() {
        await axios.post(`/user/${userEmail}`, { withCredentials: true})
        .then(response => {
            const { completedLesson } = response.data;
            setUserLesson(completedLesson);
        })
        .catch(err => {
            console.log('error')
        });
    };

    function returnDashboard() {
        setStartedLesson(null);
    };

    async function resumeLesson() {
            await axios.get(`/user/${userEmail}`, { withCredentials: true })
            .then(response => {
                const { completedLesson } = response.data;
                setUserLesson(completedLesson);
                setStartedLesson(true);


            }).catch(err => {
                console.log('error');
            });
    };

    async function resetLesson() {
        axios.post(`/user/${userEmail}`, { withCredentials: true })
        .then(response => {
            const { completedLesson } = response.data;
            setUserLesson(completedLesson);
        }).catch(err => {
            console.log('error')
        });
    };


    return (
            <Container>

                {!isLoggedIn && <Redirect to='signIn' />}
                <Box className={classes.startContainer}>
                {!startedLesson && <Typography variant='h5'>Welcome, {userEmail}</Typography>}
                {!startedLesson && <Button size='large' className={classes.resumeButton} onClick={resumeLesson}>Start Lessons</Button>}
                </Box>
                
                {startedLesson ? <Grid container className={classes.contentContainer}>
                    <Grid item className={classes.lesson}>{userLesson === 0 && <LessonOne />}</Grid>
                    <Grid item className={classes.lesson}>{userLesson === 1 && <LessonTwo />}</Grid>
                    <Grid item className={classes.lesson}>{userLesson === 2 && <LessonThree />}</Grid>
                    <Grid item className={classes.lesson}>{userLesson === 3 && <CompletedCourse />}</Grid>
                    </Grid>
                    :
                    null
                    }
                {!startedLesson || userLesson === 3 ? null : <ButtonGroup variant='contained' className={classes.buttongroup}>
                     <Button className={classes.buttons} onClick={returnDashboard}>Return</Button>
                     <Button className={classes.buttons} onClick={nextLesson}>Next lesson</Button>
                 </ButtonGroup>}
                {userLesson === 3 ?  <ButtonGroup className={classes.buttons}>
                     <Button className={classes.buttons}>Download</Button>
                     <Button className={classes.buttons} onClick={resetLesson}>Start over</Button>
                 </ButtonGroup>
                 :
                 null
                }

            </Container>
    )

}