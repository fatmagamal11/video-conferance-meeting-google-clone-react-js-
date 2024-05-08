import React, { useEffect, useRef } from "react";
import "./Participant.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Card } from "../../shared/Card/Card.component.js";
// // import Card from "../../shared/Card/Card.component.js";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
// import { Participant } from "./participant/Participant.component.js";
export const Participant = ({ Participant }) => {
    const videoRef = useRef(null);
    const userStream = useSelector((state) => state.mainStream);
    const remoteStream = new MediaStream();
    useEffect(() => {
      if (userStream && Participant.peerConnection) {
        Participant.peerConnection.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
          videoRef.current.srcObject = remoteStream;
        };
      }
    }, [Participant.peerConnection]);
    useEffect(() => {
      if (userStream&&Participant.currentUser) {
        videoRef.current.srcObject = userStream;
        videoRef.current.muted = true;
      }
    }, [Participant.currentUser, userStream]);
  return (
    <div className="participant">
      <Card>
        <video ref={videoRef} className="video" autoPlay playsInline></video>
        <FontAwesomeIcon className="muted" icon={faMicrophoneSlash} />
        <div style={{ background: Participant.avatarColor }} className="avatar">
          
          {Participant.userName.charAt(0)}
          
        </div>
        <div className="name">
          {Participant.userName}
          {Participant.currentUser ? "(You) " : ""}
        </div>
      </Card>
    </div>
  );
};
