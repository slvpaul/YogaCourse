import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    title: {
        marginBottom: '20px'
    },
    paragraph: {
        paragraph: true
    }
}));




export default function CourseCompleted() {
    const classes = useStyles();

    
    

    return (
    
            <Container>
              <Typography className={classes.title} component='h1' variant='h5'>Congratulations! You have completed the course</Typography>
              <Typography className={classes.paragraph} variant='body1'>Download your completion certificate by clicking the button below or you can start over and take the course again</Typography>
            </Container>
    
     
)
}