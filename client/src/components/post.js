import React from 'react'
import {
  ListItem, 
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core'
import { Grow } from '.'

const useStyles = makeStyles(theme => ({
  primaryText: {
    display: 'flex',
    alignItems: 'center'
  },
}))

export default ({ title, date, summary, author, onClick }) => {
  const classes = useStyles()

  return (
    <ListItem button onClick={onClick}>
      <ListItemText
        primary={
          <div className={classes.primaryText}>
            <Typography variant="body1">
              {title}
            </Typography>
            <Grow />
            <Typography variant="caption">
              {date.toLocaleDateString()}
            </Typography>
          </div>
        }
        secondary={`${summary} - By ${author}`}
      />
    </ListItem>
  )
}
