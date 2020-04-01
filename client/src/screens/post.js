import React, { useState, useEffect } from 'react'
import {
  Gap,
  Row,
  Grow,
  SkeletonWrapper
} from '../components'
import {
  Typography,
  makeStyles,
  Paper,
  Breadcrumbs,
  Link,
  Container,
  LinearProgress
} from '@material-ui/core'
import { getPost } from '../api/posts'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  body: {
    padding: theme.spacing(1, 2)
  }
}))

export default () => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const params = useParams()
  const classes = useStyles()

  useEffect(() => {
    const fn = async () => {
      setTimeout(async () => {
      setPost(await getPost(params.id))
      setLoading(false)
      }, 1000)
    }
    fn()
  }, [])

  const tags = post ? post.tags.split(',') : [ 'tag', 'tag' ]

  return (
    <React.Fragment>
      { loading && <LinearProgress color="secondary" /> }
      <Gap size="2" />
      <Container fixed>
        <SkeletonWrapper loading={loading}>
          <Typography variant="h4">
            { (post ? post.title : 'Title') }
          </Typography>
        </SkeletonWrapper>
        <SkeletonWrapper loading={loading}>
          <Typography variant="subtitle1" color="textSecondary">
            { (post ? post.summary : 'Summary') }
          </Typography>
        </SkeletonWrapper>
        <Gap size="2" />
        <Row>
          <SkeletonWrapper loading={loading}>
            <Breadcrumbs separator="::" aria-label="breadcrumb">
              {tags.map(tag => (
                <Link color="inherit">
                  {tag.trim()}
                </Link>
              ))}
            </Breadcrumbs>
          </SkeletonWrapper>
          <Grow />
          <SkeletonWrapper loading={loading}>
            <Typography color="textSecondary">
              {new Date(post && post.created_at).toLocaleDateString()}
            </Typography>
          </SkeletonWrapper>
        </Row>
        <Gap size="1" />
        <Paper className={classes.body}>
          <SkeletonWrapper loading={loading}>
            <Typography variant="body">
              <pre>
                {post && post.content}
              </pre>
            </Typography>
          </SkeletonWrapper>
        </Paper>
      </Container>
    </React.Fragment>
  )
}
