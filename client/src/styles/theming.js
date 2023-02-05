import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#FF3041',
        },
        secondary: {
          main: '#3B57A9',
        },
        yellowButton: {
          main: '#FFAB13',
          contrastText: '#fff'
        },
        disabledButton: {
          main: '#c4c4c4',
          contrastText: '#fff'
        }
      },
      
      typography: {
        fontFamily: [
          'Manjari'
        ].join(','),
      },

})

export default theme;