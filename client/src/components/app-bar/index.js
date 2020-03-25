import React from 'react'
import {
  AppBar, 
  Toolbar,
  makeStyles,
  Button,
  Container,
  InputBase,
  fade,
  IconButton,
  Tooltip,
  Link
} from '@material-ui/core'
import {
  Search   as SearchIcon,
  AddBox   as NewBlogIcon,
  MoreVert as MoreIcon
} from '@material-ui/icons'
import RenderMobileMenu, { 
  menuId as mobileMenuId 
} from './mobile-menu'
import { 
  MobileSection, 
  DesktopSection, 
  Grow 
} from '..'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '&:hover': {
      textDecoration: 'none'
    }
  },
  toolbar: {
    paddingLeft: 0,
    paddingRight: 0
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, .15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, .25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

export default () => {
  const classes = useStyles()
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState(null)

  const handleMobileMenuOpen = ({ currentTarget }) => {
    setMobileMenuAnchorEl(currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null)
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Container fixed>
          <Toolbar className={classes.toolbar}>
            <Link 
              href="#" 
              color="inherit"
              className={classes.title}
              variant="h6"
              noWrap
            >
              Blog
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase 
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Grow />
            <DesktopSection>
              <Button color="inherit">Home</Button>
              <Button color="inherit">About</Button>
              <Tooltip title="New Post" aria-label="new post">
                <IconButton color="inherit">
                  <NewBlogIcon />
                </IconButton>
              </Tooltip>
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
          </Toolbar>
        </Container>
      </AppBar>
      <RenderMobileMenu
        anchorEl={mobileMenuAnchorEl}
        onClose={handleMobileMenuClose}
      />
    </React.Fragment>
  )
}
