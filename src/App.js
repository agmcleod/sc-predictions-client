import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NewGame from '@core/NewGame'

import { Wrapper } from './styledComponents'

class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <Router>
          <Route path='/' exact component={NewGame} />
        </Router>
      </Wrapper>
    )
  }
}

export default App
