import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'

import { muiTheme, theme } from 'common/theme'
import { store, persistor } from 'common/store'
import { Routes } from 'core/Routes'
import { Websocket } from './core/Websocket'

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          <PersistGate loading={null} persistor={persistor}>
            <Websocket />
            <Routes />
          </PersistGate>
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  )
}
