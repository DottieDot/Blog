import React from 'react'
import {
  makeStyles
} from '@material-ui/core'
import {
  Skeleton
} from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative'
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  }
}))

export default ({ loading, animation = "wave", children }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div style={{ opacity: loading ? 0 : 1 }}>
        {children}
      </div>
      { loading && <Skeleton className={classes.skeleton} animation={animation} /> }
    </div>
  )
}
