import dpref, { userName, connectedRef } from "./server/firebase";
import "./App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  addParticipant,
  removeParticipant,
  setUser,
    setUserStream,
} from "./store/actioncreator";
import { MainScreen } from "./components/mainScreen/MainScreen.component.js";
function App(props) {
  const participantRef = dpref.child("participants");
  useEffect(() => {
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then((mediaStream) => {
            // mediaStream.getVideoTracks()[0].enabled = false;
            props.setUserStream(mediaStream);
            console.log(mediaStream)
          });
    connectedRef.on("value", (snap) => {
      if (snap.val()) {
        const defaultReferances = {
          audio: true,
          video: false,
          screen: false,
        };
        const userRef = participantRef.push({
          userName,
          preference: defaultReferances,
        });
        props.setUser({
          [userRef.key]: {
            userName,
            ...defaultReferances,
          },
        });
        userRef.onDisconnect().remove();
      }
    });
  }, []);

  useEffect(() => {
    if (props.user) {
      participantRef.on("child_added", (snap) => {
        const { userName, preferences } = snap.val();
        props.addParticipant({
          [snap.key]: {
            userName,
            ...preferences,
          },
        });
      });
      participantRef.on("child_removed", (snap) => {
        props.removeParticipant(snap.key);
      });
    }
  }, [props.user]);
  return (
    <div className="App">
   
      <MainScreen />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    participants: state.participants,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserStream: (stream) => dispatch(setUserStream(stream)),
    setUser: (user) => dispatch(setUser(user)),
    addParticipant: (participant) => dispatch(addParticipant(participant)),
    removeParticipant: (participantKey) =>
      dispatch(removeParticipant(participantKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
