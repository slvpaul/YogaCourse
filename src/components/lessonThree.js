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





export default function LessonThree() {
    const classes = useStyles();


    return (
    
            <Container>
              <Typography className={classes.title} component='h1' variant='h5'>Lesson 3</Typography>
              <Typography className={classes.paragraph} variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus tempor magna non finibus. Pellentesque et lorem eu urna semper rutrum. Curabitur ac accumsan felis, ut convallis ex. Suspendisse id lorem sed elit vehicula sodales. Curabitur ut consectetur nulla. Nam tortor diam, scelerisque eget imperdiet bibendum, faucibus eget nisi. Cras id metus vitae tellus efficitur hendrerit. Nulla at nulla id velit efficitur ultrices. Suspendisse maximus, felis non condimentum lacinia, arcu dolor lacinia dolor, eget facilisis ex risus eu nibh. Mauris nunc augue, tempus nec tincidunt in, luctus et mauris. Pellentesque scelerisque condimentum purus, et suscipit felis efficitur nec.</Typography>
              <br/>
              <Typography className={classes.paragraph} variant='body1'>Vivamus sodales condimentum lacus, non fringilla dolor vehicula sed. Proin convallis convallis nulla a convallis. Nam eleifend ligula quis commodo cursus. Fusce cursus, turpis ac bibendum interdum, lorem dui fringilla felis, eget aliquam lacus erat non eros. Cras massa lorem, viverra ornare quam id, tempus feugiat orci. Curabitur cursus scelerisque pharetra. Etiam non consequat tellus, id lacinia justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</Typography>
              <br/>
              <Typography className={classes.paragraph} variant='body1'>Etiam id imperdiet sapien. Duis varius mi nisi, sed efficitur enim feugiat ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus vel metus non lectus congue interdum. Fusce at malesuada elit. Fusce finibus dolor vestibulum, bibendum sapien non, hendrerit libero. Sed commodo libero lorem, ac bibendum magna lacinia id.</Typography>

            </Container>
    
     
)
}