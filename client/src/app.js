import React from 'react'
import {
  CssBaseline, 
  Typography,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { useMediaPredicate } from 'react-media-hook'
import * as Screens from './screens'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  }
})

export default () => {
  const prefersDarkTheme = useMediaPredicate('(prefers-color-scheme: dark)')

  return (
    <ThemeProvider theme={prefersDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
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
      </BrowserRouter>
    </ThemeProvider>
  )
}
