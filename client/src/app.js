import React from 'react'
import {
  AppBar, 
  Post,
  Gap
} from './components'
import { 
  Container, 
  CssBaseline, 
  Typography,
  Divider
} from '@material-ui/core'

export default () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <Container fixed >
        <Gap size="2" />
        <Typography variant="h4">
          Recent posts
        </Typography>
        <Gap size="1" />
        <Post 
          title="Hello There"
          summary="General Kenobi!"
          author="Dot."
          date={new Date()}
        />
      </Container>
    </React.Fragment>
  )
}
