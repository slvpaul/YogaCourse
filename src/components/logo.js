import { Box } from '@material-ui/core';
import { useStyles } from '../styles/styles';

export default function Logo(props) {
    const classes = useStyles(props);
    return (
        <Box>
              
        <img className={classes.logo} src="/images/logo.png" alt='logo' />

        </Box>

    )
}