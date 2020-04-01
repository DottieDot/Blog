import React, { useEffect } from 'react'
import {
  AppBar, 
  Toolbar,
  makeStyles,
  Button,
  Container,
  IconButton,
  Tooltip,
  Link
} from '@material-ui/core'
import {
  AddBox    as NewBlogIcon,
  MoreVert  as MoreIcon,
  ExitToApp as LogoutIcon,
  VpnKey    as LoginIcon
} from '@material-ui/icons'
import {
  Link as RouterLink
} from 'react-router-dom'
import RenderMobileMenu, { 
  menuId as mobileMenuId 
} from './mobile-menu'
import { 
  MobileSection, 
  DesktopSection, 
  Grow 
} from '..'
import { NewPost } from '../../dialogs'
import { isLoggedIn, logout } from '../../api/auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    display: 'block',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0
  }
}))

export default () => {
  const classes = useStyles()
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState(null)
  const [newBlogOpen, setNewBlogOpen] = React.useState(null)
  const [loggedIn, setLoggedIn] = React.useState(false)

  useEffect(() => {
    const fn = async() => {
      setLoggedIn(await isLoggedIn())
    }
    fn()
  }, [])

  const handleMobileMenuOpen = ({ currentTarget }) => {
    setMobileMenuAnchorEl(currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null)
  }

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Container fixed>
          <Toolbar className={classes.toolbar}>
            <Link 
              to="/home" 
              color="inherit"
              className={classes.title}
              variant="h6"
              component={RouterLink}
              noWrap
            >
              Dot.Blog
            </Link>
            <Grow />
            <DesktopSection>
              <Button color="inherit" component={RouterLink} to="/home">Home</Button>
              <Button color="inherit" component={RouterLink} to="/about">About</Button>
            </DesktopSection>
            <MobileSection>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </MobileSection>
            {loggedIn ? (
              <React.Fragment>
                <Tooltip title="New Post" aria-label="new post">
                  <IconButton color="inherit" onClick={() => setNewBlogOpen(true)}>
                    <NewBlogIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout" aria-label="logout">
                  <IconButton color="inherit" onClick={handleLogout}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            ) : (
              <Tooltip title="Sign In" aria-label="sign in">
                <IconButton 
                  color="inherit" 
                  component={RouterLink} 
                  to="/auth/login"
                >
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <RenderMobileMenu
        anchorEl={mobileMenuAnchorEl}
        onClose={handleMobileMenuClose}
        onNewBlog={() => {
          setNewBlogOpen(true)
        }}
      />
      <NewPost
        open={newBlogOpen}
        onClose={() => setNewBlogOpen(false)}
      />
    </React.Fragment>
  )
}
