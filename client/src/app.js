import React from 'react'
import {
  CssBaseline, 
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { useMediaPredicate } from 'react-media-hook'
import * as Containers from './page-containers'

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
          <Route path="/auth">
            <Containers.AuthPage />
          </Route>
          <Route path="*">
            <Containers.RegularPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}
