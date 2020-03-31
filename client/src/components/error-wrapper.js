import React from 'react'
import { Typography } from '@material-ui/core'

export default ({ error, color = 'error', variant = 'caption', children }) => (
  <React.Fragment>
    {children}
    <Typography
      variant={variant}
      color={color}
    >
      {error}
    </Typography>
  </React.Fragment>
)
