import React from 'react'
import {
  Typography
} from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import * as Screens from '../screens'
import { AppBar } from '../components'

export default () => {
  return (
    <React.Fragment>
      <AppBar />
      <Switch>
        <Route path="/home">
          <Screens.Home />
        </Route>
        <Route path="/about">
          <Screens.About />
        </Route>
        <Route path="/posts/:id">
          <Screens.Post />
        </Route>
        <Route path="*">
          <Typography variant="h4">404 Not found</Typography>
        </Route>
      </Switch>
    </React.Fragment>
  )
}