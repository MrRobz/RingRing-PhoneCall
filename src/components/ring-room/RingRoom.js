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

  constructor() {
    super(...arguments);
    
    let roomHash = this.props.match.params.id;

     // eslint-disable-next-line no-undef
    this.drone = new ScaleDrone('mZvXak3SoSnlOPyL');
    // Room name needs to be prefixed with 'observable-'
    this.roomName = 'observable-' + roomHash;
    this.configuration = {
      iceServers: [{
        urls: 'stun:stun.l.google.com:19302'
      }]
    };
  }

  componentDidMount() {
    let remoteVideo = document.querySelector('#remoteVideo');
    let localVideo = document.querySelector('#localVideo');

    function onSuccess() {};
    let onError = (error) => {
      console.error(error);
    };

    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      this.room = this.drone.subscribe(this.roomName);
      this.room.on('open', error => {
        if (error) {
          onError(error);
        }
      });
      // We're connected to the room and received an array of 'members'
      // connected to the room (including us). Signaling server is ready.
      this.room.on('members', members => {
        console.log('MEMBERS', members);
        // If we are the second user to connect to the room we will be creating the offer
        const isOfferer = members.length === 2;
        startWebRTC(isOfferer);
      });
    });

    // Send signaling data via Scaledrone
    let sendMessage = (message) => {
      this.drone.publish({
        room: this.roomName,
        message
      });
    }

    let startWebRTC = (isOfferer) => {
      this.pc = new RTCPeerConnection(this.configuration);

      // 'onicecandidate' notifies us whenever an ICE agent needs to deliver a
      // message to the other peer through the signaling server
      this.pc.onicecandidate = event => {
        if (event.candidate) {
          sendMessage({'candidate': event.candidate});
        }
      };

      // If user is offerer let the 'negotiationneeded' event create the offer
      if (isOfferer) {
        this.pc.onnegotiationneeded = () => {
          this.pc.createOffer().then(localDescCreated).catch(onError);
        }
      }

      // When a remote stream arrives display it in the #remoteVideo element
      this.pc.ontrack = event => {
        const stream = event.streams[0];
        if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
          remoteVideo.srcObject = stream;
        }
      };

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      }).then(stream => {
        // Display your local video in #localVideo element
        localVideo.srcObject = stream;
        // Add your stream to be sent to the conneting peer
        stream.getTracks().forEach(track => this.pc.addTrack(track, stream));
      }, onError);

      // Listen to signaling data from Scaledrone
      this.room.on('data', (message, client) => {
        // Message was sent by us
        if (client.id === this.drone.clientId) {
          return;
        }

        if (message.sdp) {
          // This is called after receiving an offer or answer from another peer
          this.pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
            // When receiving an offer lets answer it
            if (this.pc.remoteDescription.type === 'offer') {
              this.pc.createAnswer().then(localDescCreated).catch(onError);
            }
          }, onError);
        } else if (message.candidate) {
          // Add the new ICE candidate to our connections remote description
          this.pc.addIceCandidate(
            new RTCIceCandidate(message.candidate), onSuccess, onError
          );
        }
      });
    }

    let localDescCreated = (desc) => {
      this.pc.setLocalDescription(
        desc,
        () => sendMessage({'sdp': this.pc.localDescription}),
        onError
      );
    }
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

        <video id="localVideo" autoPlay muted></video>
        <video id="remoteVideo" autoPlay></video>
      </div>
    )
  }
}

export default withStyles(useStyles)(RingRoom);