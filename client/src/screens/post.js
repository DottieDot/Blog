import React from 'react'
import {
  AppBar, 
  Gap,
  Row,
  Grow
} from '../components'
import { 
  Container,
  Typography,
  makeStyles,
  Paper,
  Breadcrumbs,
  Link
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  body: {
    padding: theme.spacing(1, 2)
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar />
      <Container fixed>
        <Gap size="2" />
        <Typography variant="h4">
          Hello There
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          General kenobi
        </Typography>
        <Gap size="2" />
        <Row>
          <Breadcrumbs separator="::" aria-label="breadcrumb">
            <Link color="inherit" to="/search?tag=school">
              School
            </Link>
            <Link color="inherit" to="/search?tag=school,media">
              Media
            </Link>
          </Breadcrumbs>
          <Grow />
          <Typography color="textSecondary">
            {new Date().toLocaleDateString()}
          </Typography>
        </Row>
        <Gap size="1" />
        <Paper className={classes.body}>
          <Typography variant="body">
            <p>Sint nostrud cupidatat sint voluptate sint minim. Excepteur irure nostrud fugiat incididunt aliqua commodo. Laboris voluptate est excepteur amet laborum tempor aute in eu deserunt velit officia ut voluptate. Officia laboris eu velit amet sunt voluptate deserunt. Officia enim qui proident eu.</p>
            <p>Exercitation do deserunt commodo irure nostrud officia officia amet laboris. Elit labore velit Lorem dolor anim irure veniam. Consequat commodo reprehenderit excepteur nostrud sunt dolor nulla. Duis labore duis ut commodo enim ipsum magna culpa. Qui Lorem occaecat ad eu est ea ipsum anim ullamco. Occaecat qui tempor est cillum elit sit est tempor ad labore ad. Laboris sint et pariatur magna culpa pariatur non duis ad veniam et amet.</p>
            <p>Voluptate dolore adipisicing ad pariatur ad. Veniam eu esse minim aliqua enim dolore qui in irure esse veniam dolor. Enim elit incididunt amet in ipsum laboris ipsum incididunt id proident. Irure duis ullamco Lorem incididunt occaecat cillum. Et sint ullamco officia dolor veniam laborum aute do amet irure duis adipisicing irure. Exercitation excepteur sint labore id duis consequat velit amet nostrud cupidatat. Laborum officia irure laboris ullamco ipsum dolor minim magna nostrud irure id pariatur quis.</p>
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  )
}
