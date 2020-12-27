import { Box, Typography } from '@material-ui/core';
import Logo from './logo';
import { useStyles } from '../styles/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';



export default function Home(props) {
    const classes = useStyles(props);

    return (
      <Box>
          <Logo />
          <Typography className={classes.header} variant='h5' component='h1'>Welcome to the Buddha Energy App!</Typography>
          <Typography className={classes.paragraph} variant='h6' component='h2'>With this app, you can learn how to meditate and access the hidden energies of the body</Typography>
          <Link to='signUp'>
          <ArrowForwardIcon className={classes.arrow} fontSize={'large'}/>
          </Link>

      </Box>
    );
    }