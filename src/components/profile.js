import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Button } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LessonOne from '../components/lessonOne';


export default function Profile({ isLoggedIn }) {
    const [userEmail, setUserEmail] = useState('');
    const [userLesson, setUserLesson] = useState();
    const [userCreated, setUserCreated] = useState();
    const [userSubscribed, setUserSubscribed] = useState();
    
    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:8080/user', {withCredentials: true})
        .then(response => {
            if(isMounted) {
                if(response.data.user) {
                setUserEmail(response.data.user.email);
            } 
        } return null;})
        .catch(err => console.log(err));
        return () => { isMounted = false };
    }, []);

    async function resumeLesson() {
            await axios.get(`http://localhost:8080/user/${userEmail}`, { withCredentials: true })
            .then(response => {
                const { isSubscribed, completedLesson, created } = response.data;
                setUserSubscribed(isSubscribed);
                setUserCreated(created);
                setUserLesson(completedLesson);


            }).catch(err => {
                console.log('error');
            });
    }


    return (
            <Container>

                {!isLoggedIn ? <Redirect to='signIn' /> :
                <>
                <Box>
                   <Typography>Welcome, {userEmail}</Typography>
                </Box>
                <Box>
                    <Button onClick={resumeLesson}>Resume Lessons</Button>
                    <Typography>You are on Lesson {userLesson + 1}</Typography>
                </Box>
                <Box>
                    {userLesson === 0 && <LessonOne />}
                </Box>
                </>
}
            </Container>
    )

}