import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { NewGame } from '@core/NewGame'
import { Lobby } from '@core/Lobby'
import { Wrapper } from './styledComponents'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Wrapper>
          <Route path='/' exact component={NewGame} />
          <Route path='/Lobby/:id' exact component={Lobby} />
        </Wrapper>
      </Router>
    )
  }
}

export default App
