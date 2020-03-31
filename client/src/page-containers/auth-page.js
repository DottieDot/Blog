import React, { useEffect } from 'react'
import {
  Container,
  Paper,
  makeStyles,
  Avatar
} from '@material-ui/core'
import {
  LockOutlined as LockOutlinedIcon
} from '@material-ui/icons'
import { Switch, Route, useHistory } from 'react-router-dom'
import * as Screens from '../screens'
import { Gap } from '../components'
import { isLoggedIn } from '../api/auth'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 4)
  },
  avatar: {
    background: theme.palette.secondary.main
  }
}))

export default () => {
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    const fn = async () => {
      if (await isLoggedIn()) {
        history.replace('/home')
      }
    }
    fn()
  }, [history])

  return (
    <Container component="main" maxWidth="xs">
      <Gap size="8" />
      <Paper className={classes.container}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Gap size="2" />
        <Switch>
          <Route path="/auth/login">
            <Screens.Login />
          </Route>
          <Route path="*">
            Go fuck yourself
          </Route>
        </Switch>
      </Paper>
    </Container>
  )
}

