import React from 'react'
import {
  AppBar, 
  Post,
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
