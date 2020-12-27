import React from 'react';
import { useUser } from '../lib/hooks';
import { Link } from 'react-router-dom';
import { Typography, Container, Box } from '@material-ui/core';

export default function Profile() {
    const [user, { mutate }] = useUser();
    const { 
        email, 
        created, 
        completedLesson } = user || {};


if (!user) {
    return (
        <Container>
        <Link to='/signIn'>
            <Typography>Please sign in</Typography>
        </Link>
        </Container>
    );
}

return (
    <Container maxWidth='xs'>
        <Box>
            <Typography>Email</Typography>
            <Typography>{email}</Typography>
        </Box>
        <Box>
            <Typography>Created</Typography>
            <Typography>{created}</Typography>
        </Box>
        <Box>
            <Typography>Lesson Progress</Typography>
            <Typography>{completedLesson}</Typography>
        </Box>
        <Box>
            <Link to='/settings'>
            <Typography>Edit</Typography>
            </Link>
        </Box>

    </Container>


)

};