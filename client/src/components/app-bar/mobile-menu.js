import React from 'react'
import {
  Menu,
  MenuItem,
  IconButton
} from '@material-ui/core'
import {
  Home  as HomeIcon,
  Info  as AboutIcon,
  AddBox as NewBlogIcon
} from '@material-ui/icons'
import {
  Link as RouterLink
} from 'react-router-dom'

export const menuId = "primary-appbar-mobile-menu"

export default ({ anchorEl, onClose }) => {
  return (
    <Menu 
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!anchorEl}
      onClose={onClose}
    >
      <MenuItem component={RouterLink} to="/home">
        <IconButton>
          <HomeIcon />
        </IconButton>
        Home
      </MenuItem>
      <MenuItem component={RouterLink} to="/about">
        <IconButton>
          <AboutIcon />
        </IconButton>
        About
      </MenuItem>
      <MenuItem component={RouterLink} to="/new-post">
        <IconButton>
          <NewBlogIcon />
        </IconButton>
        New Blog
      </MenuItem>
    </Menu>
  )
}
