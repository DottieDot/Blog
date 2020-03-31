import React from 'react'
import {
  Post,
  Gap
} from '../components'
import {
  Typography
} from '@material-ui/core'
import {
  useHistory
} from 'react-router-dom'

export default () => {
  const h = useHistory()

  return (
    <React.Fragment>
      <Typography variant="h4">
        Recent posts
      </Typography>
      <Gap size="1" />
      <Post 
        title="Hello There"
        summary="General Kenobi!"
        author="Dot."
        date={new Date()}
        onClick={() => { h.push('/posts/1') }}
      />
    </React.Fragment>
  )
}
