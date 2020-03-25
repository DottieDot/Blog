import React from 'react'
import {
  AppBar
} from './components'
import { 
  Container, 
  CssBaseline 
} from '@material-ui/core'

export default () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <Container fixed>
        <h1>Hello World</h1>
      </Container>
    </React.Fragment>
  )
}
