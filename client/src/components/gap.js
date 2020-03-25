import React from 'react'
import { useTheme } from '@material-ui/core'

export default ({ size = 1 }) => {
  const theme = useTheme()

  let typeCorrect = size
  if (typeof typeCorrect === 'string')
  {
    typeCorrect = +size
  }

  return (
    <div style={{ height: theme.spacing(typeCorrect) }} />
  )
}
