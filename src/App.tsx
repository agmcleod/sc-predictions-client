import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import Container from '@material-ui/core/Container'

import { muiTheme, theme } from 'common/theme'
import { store, persistor } from 'common/store'
import { NewGame } from 'core/NewGame'
import { Lobby } from 'core/Lobby'
import { JoinGame } from 'core/JoinGame'

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <Container>
                <Route path='/' exact component={NewGame} />
                <Route path='/lobby' exact component={Lobby} />
                <Route path='/join' exact component={JoinGame} />
              </Container>
            </Router>
          </PersistGate>
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  )
}
