import React from 'react'
import {
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  }
}))

export default (props) => {
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      {...props}
    />
  )
}
