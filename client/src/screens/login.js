import React, { useState } from 'react'
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core'
import { Gap } from '../components'
import { login } from '../api/auth'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  buttonWrapper: {
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()
  const classes = useStyles()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoggingIn(true)

    const success = await login(email, password)
    if (success) {
      history.replace('/home')
    }
    else {
      setLoggingIn(false)
      setError('Incorrect email or password')
    }
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form 
        method="post" 
        onSubmit={onSubmit}
        noValidate
        className={classes.form}
      >
        <TextField
          variant="standard"
          margin="normal"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          disabled={loggingIn}
          required
          fullWidth
          error={!!error}
        />
        <TextField
          variant="standard"
          margin="normal"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-passwor"
          value={password}
          onChange={handlePasswordChange}
          disabled={loggingIn}
          required
          fullWidth
          error={!!error}
        />
        {error && (
          <React.Fragment>
            <Gap size="1" />
            <Typography 
              variant="caption"
              color="error"
            >
              {error}
            </Typography>
          </React.Fragment>
        )}
        <Gap size="2" />
        <div className={classes.buttonWrapper}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disableElevation 
            fullWidth
            disabled={!email || !password || loggingIn}
          >
            Sign In
          </Button>
          {loggingIn && <CircularProgress size={24} className={classes.buttonProgress} color="secondary" />}
        </div>
      </form>
    </React.Fragment>
  )
}
