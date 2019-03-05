import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { store, persistor } from '@common/store'
import { NewGame } from '@core/NewGame'
import { Lobby } from '@core/Lobby'
import { JoinGame } from '@core/JoinGame'
import { Wrapper } from './styledComponents'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Wrapper>
              <Route path='/' exact component={NewGame} />
              <Route path='/lobby/:id' exact component={Lobby} />
              <Route path='/join' exact component={JoinGame} />
            </Wrapper>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
