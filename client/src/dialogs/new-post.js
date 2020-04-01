import React, { useState } from 'react'
import { 
  Dialog, 
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Container,
  Slide,
  makeStyles,
  Button,
  TextField,
  Grid,
  LinearProgress
} from '@material-ui/core'
import {
  Close as CloseIcon
} from '@material-ui/icons'
import { 
  Gap 
} from '../components'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { savePost } from '../api/posts'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  toolBar: {
    paddingLeft: 0,
    paddingRight: 0
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ onClose, open }) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleTagsChange = (e) => {
    setTags(e.target.value)
  }

  const handleSummaryChange = (e) => {
    setSummary(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setSubmitting(true)

    const postId = await savePost(title, summary, tags, content)
    if (postId === null) {
      enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
      setSubmitting(false)
    }
    else {
      history.push(`/posts/${postId}`)
      setTitle('')
      setSummary('')
      setTags('')
      setContent('')
      setSubmitting(false)
      onClose()
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate method="post">
      <Dialog fullScreen  open={!!open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} position="fixed">
          <Container fixed>
            <Toolbar className={classes.toolBar}>
              <IconButton 
                edge="start" 
                color="inherit" 
                onClick={onClose} 
                aria-label="close"
                disabled={submitting}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Post
              </Typography>
              <Button 
                type="submit"
                onClick={onSubmit}
                color="inherit"
                disabled={submitting}
              >
                Save
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        {submitting && <LinearProgress color="secondary" />}
        <Gap size="2" />
        <Container fixed>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Title"
                value={title}
                onChange={handleTitleChange}
                disabled={submitting}
                fullWidth
                required
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Tags"
                value={tags}
                onChange={handleTagsChange}
                disabled={submitting}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Summary"
                value={summary}
                onChange={handleSummaryChange}
                disabled={submitting}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Gap size="4" />
          <TextField
            label="Content"
            variant="filled"
            value={content}
            onChange={handleContentChange}
            disabled={submitting}
            multiline
            fullWidth
            required
          />
        </Container>
      </Dialog>
    </form>
  )
}
