import { Box, Typography } from '@material-ui/core';
import Logo from './logo';
import { makeStyles } from '@material-ui/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import theme from '../styles/theme';

const useStyles = makeStyles(() => ({
  arrow : {
    [theme.breakpoints.down('sm')] : {
        marginTop: '50px'

    },
    [theme.breakpoints.up('md')]: {
        display: 'none'

    }
},
}));


export default function Home(isloggedIn) {
    const classes = useStyles();

    return (
      <Box className={classes.homeContainer}>
          <Logo />
          <Typography className={classes.header} variant='h5' component='h1'>Welcome to the Buddha Energy App!</Typography>
          <Typography className={classes.paragraph} variant='h6' component='h2'>With this app, you can learn how to meditate and access the hidden energies of the body</Typography>
          {isloggedIn ? <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/dashboard'>
          <ArrowForwardIcon className={classes.arrow} fontSize={'large'}/>
          </Link>
          : <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/signUp'>
          <ArrowForwardIcon className={classes.arrow} fontSize={'large'}/>
          </Link>}

      </Box>
    );
    }