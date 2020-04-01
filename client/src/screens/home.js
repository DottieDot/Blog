import React, { useEffect, useState } from 'react'
import {
  Post,
  Gap
} from '../components'
import {
  Typography, 
  LinearProgress,
  Container
} from '@material-ui/core'
import {
  useHistory
} from 'react-router-dom'
import { getPosts } from '../api/posts'

export default () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const h = useHistory()

  useEffect(() => {
    const fn = async () => {
      setPosts(await getPosts())
      setLoading(false)
    }
    fn()
  }, [])

  return (
    <React.Fragment>
      { loading && <LinearProgress color="secondary" /> }
      <Gap size="2" />
      <Container fixed>
        <Typography variant="h4">
          Recent posts
        </Typography>
        <Gap size="1" />
        {posts.map(({ id, title, summary, created_at }) => (
          <Post
            key={id}
            title={title}
            summary={summary}
            author="Dot."
            date={new Date(created_at)}
            onClick={() => { h.push(`/posts/${id}`) }}
          />
        ))}
      </Container>
    </React.Fragment>
  )
}
