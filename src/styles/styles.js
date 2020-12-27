import { makeStyles } from '@material-ui/core/styles';
import theme from './theme';
import 'fontsource-roboto';

const useStyles = makeStyles({
    root: {
        [theme.breakpoints.down('sm')] : {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0ecdf'

        },
    },
    container: {
        [theme.breakpoints.down('sm')] : {
            width: '75vw',
            height: '75vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Roboto',

        },

    },

    nav: {
        [theme.breakpoints.down('sm')] : {
            display: "none"

        },
    },

    logo: {
        [theme.breakpoints.down('sm')] : {

        },
    },

    header: {
        [theme.breakpoints.down('sm')] : {
            margin: '5px'

        },
    },

    paragraph: {
        [theme.breakpoints.down('sm')] : {
            marginTop: '20px'

        },
    },

    arrow : {
        [theme.breakpoints.down('sm')] : {
            marginTop: '50px'

        },
    },

    paper: {
        [theme.breakpoints.down('sm')] : {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'

        },
    },

    avatar: {
        [theme.breakpoints.down('sm')] : {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main

        },
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },

    submit : {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main
    },

    gosignin: {
        fontSize: '12px',
    }

    
});


export { useStyles };