import { createMuiTheme } from '@material-ui/core/styles'

export const theme = {
  colors: {
    error: '#f44336',
    fieldBorder: '#ccc'
  }
}

export const muiTheme = createMuiTheme({
  palette: {
    error: {
      main: theme.colors.error
    }
  }
})
