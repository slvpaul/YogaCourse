import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import theme from '../styles/theme';
import { Button, Container } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles(() => ({
    nav: {
        [theme.breakpoints.down('sm')] : {
            display: "none"
      
        },
    }
}))


export default function Navbar({ isLoggedIn, setLoggedInChild }) {
    const classes = useStyles();

    function handleClick(event) {
        event.preventDefault()
        axios.delete('http://localhost:8080/signout', { withCredentials: true}).then(response => {
            if (response.status === 200) {
                setLoggedInChild(false);
                window.location.reload();
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    return (
        <>
        {!isLoggedIn && <Redirect to='/' />}
    <Container className={classes.nav}>
    <nav>
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
            <Button onClick={handleClick}>Log out</Button>
        </li>
    </ul>
</nav>
</Container>
</>
)
}