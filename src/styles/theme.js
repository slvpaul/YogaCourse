import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920
        },
    },
    palette: {
      primary: {
          main: '#ffffff'
      },
      secondary: {
        main: '#3c96c7',
        dark: '#296e94'

      }

  },

  typography: {
    button: {
      textTransform: 'none'
    },
  },
});

export default theme;