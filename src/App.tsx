import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'

import { muiTheme, theme } from 'common/theme'
import { store, persistor } from 'common/store'
import { Routes } from 'core/Routes'
import { createWSConnection } from 'common/websocket'

const client = createWSConnection()

client.onopen = (ev: Event) => {
  console.log('connect:', ev)
}

client.onmessage = function (e) {
  console.log('Received:', e.data)
}

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  )
}
