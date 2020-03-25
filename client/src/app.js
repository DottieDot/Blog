import React from 'react'
import {
  CssBaseline, 
  Typography
} from '@material-ui/core'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import * as Screens from './screens'

export default () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Screens.Home />
          </Route>
          <Route path="/about">
            <Screens.About />
          </Route>
          <Route path="*">
            <Typography variant="h4">404 Not found</Typography>
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  )
}
