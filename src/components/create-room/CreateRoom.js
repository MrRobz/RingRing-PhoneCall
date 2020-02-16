import React from 'react';
import { Redirect } from 'react-router'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
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
  },
  nameText: {
    display: 'flex',
    marginTop: '10px'
  }
}));

class CreateRoom extends React.Component {
  state = {
    toCallPage: false,
    roomId: Math.random().toString(36).substring(3)
  }

  joinCall = () => {
    this.setState({
      toCallPage: true
    });
  }

  updateRoomId = ({ target }) => {
    let value = target.value
    
    this.setState({
      roomId: value
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.toCallPage) {
      return (
        <Redirect to={`/room/${this.state.roomId}`}/>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              Ring Ring
            </Typography>
          </Toolbar>
        </AppBar>

        <Typography className={classes.title}>
          Enter a room name:
        </Typography>

        <Input 
            onChange={this.updateRoomId}
            placeholder={this.state.roomId}/>
        
        <br/><br/>

        <Button 
            onClick={this.joinCall}
            variant="contained" 
            color="primary">
          Join call
        </Button>

      </div>
    )
  }
}

export default withStyles(useStyles)(CreateRoom);
