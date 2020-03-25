import React from 'react'
import {
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
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
