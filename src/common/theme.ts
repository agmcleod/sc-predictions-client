import { createTheme } from '@material-ui/core/styles'

export const theme: any = {
  colors: {
    error: '#f44336',
    fieldBorder: '#ccc',
  },
}

export const muiTheme = createTheme({
  palette: {
    error: {
      main: theme.colors.error,
    },
  },
})
