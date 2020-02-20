import React from 'react';
import { Redirect } from 'react-router'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/ArrowBackIos';
import { 
  Input,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));


class RingRoom extends React.Component {
  state = {
  }

  goBack = () => {
    this.setState({
      goBackToHome: true
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.goBackToHome) {
      return (
        <Redirect to='/'/>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton 
                onClick={this.goBack} 
                className={classes.menuButton} 
                edge="start" 
                color="inherit">
              <MenuIcon/>
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Ring Ring
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(useStyles)(RingRoom);