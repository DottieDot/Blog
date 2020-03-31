import React from 'react'
import { 
  Dialog, 
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Container,
  Slide,
  makeStyles,
  Button
} from '@material-ui/core'
import {
  Close as CloseIcon
} from '@material-ui/icons'
import { 
  MarkdownEditor, 
  Gap 
} from '../components'

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

  return (
    <div>
      <Dialog fullScreen  open={!!open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} position="fixed">
          <Container fixed>
            <Toolbar className={classes.toolBar}>
              <IconButton 
                edge="start" 
                color="inherit" 
                onClick={onClose} 
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Post
              </Typography>
              <Button color="inherit" onClick={onClose}>
                Save
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Gap size="2" />
        <Container fixed>
          <Typography variant="body1">
            <MarkdownEditor />
          </Typography>
        </Container>
      </Dialog>
    </div>
  )
}
