import React from 'react'
import { useTheme } from '@material-ui/core'

export default ({ size = 1 }) => {
  const theme = useTheme()

  return (
    <div style={{ height: theme.spacing(size) }} />
  )
}
