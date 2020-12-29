import React from 'react';
import { useUser } from '../lib/useUser';
import { Typography, Container, Box } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

export default function Profile() {
    const [user, { mutate }] = useUser();

    if(!user) {
        return (
            <Redirect to='signIn' />
        )
    };

    const { email, created, isSubscribed, completedLesson } = user || {};


    return (
            <Container>
                <Box>
                    <Typography>{email}</Typography>
                </Box>
                <Box>
                    <Typography>{created}</Typography>
                </Box>
                <Box>
                    <Typography>{isSubscribed}</Typography>
                </Box>
                <Box>
                    <Typography>{completedLesson}</Typography>
                </Box>
            </Container>
    )

}