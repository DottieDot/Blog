import React from 'react'
import {
  AppBar,
  Gap
} from '../components'
import { 
  Container,
  Typography
} from '@material-ui/core'

export default () => {
  return (
    <React.Fragment>
      <AppBar />
      <Container fixed>
        <Gap size="2" />
        <Typography variant="h4">
          About
        </Typography>
      </Container>
    </React.Fragment>
  )
}
