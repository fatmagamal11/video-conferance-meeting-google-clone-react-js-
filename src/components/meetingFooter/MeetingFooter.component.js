import React ,{ useEffect, useState } from "react";
import "./MeetingFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
// // import translateDate from '@/utils/date-translation'
import ReactTooltip from "react-tooltip";

export const MeetingFooter = (props) => {
  // const [streamState, setStreamState] = useState({
  //   mic: true,
  //   video: false,
  //   screen: false,
  // });
  // const micClick = () => {
  //   setStreamState((currentState) => {
  //     return {
  //       ...currentState,
  //       mic: !currentState.mic,
  //     };
  //   });
  // };

  // const onVideoClick = () => {
  //   setStreamState((currentState) => {
  //     return {
  //       ...currentState,
  //       video: !currentState.video,
  //     };
  //   });
  // };

  // const onScreenClick = () => {
  //   props.onScreenClick(setScreenState);
  // };

  // const setScreenState = (isEnabled) => {
  //   setStreamState((currentState) => {
  //     return {
  //       ...currentState,
  //       screen: isEnabled,
  //     };
  //   });
  // };
  // useEffect(() => {
  //   props.onMicClick(streamState.mic);
  // }, [streamState.mic]);
  // useEffect(() => {
  //   props.onVideoClick(streamState.video);
  // }, [streamState.video]);
  
  return ( <div className="meetingfooter">
    <div  className="meetingIcons"> <FontAwesomeIcon icon={faMicrophone}/>
    </div>
     {/* <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      ></div> */}
    <div  className="meetingIcons"> <FontAwesomeIcon icon={faVideo}/>
    
    </div>
     {/* <div
        className={"meeting-icons " + (!streamState.video ? "active" : "")}
        data-tip={streamState.video ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
        <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
      </div> */}
    <div  className="meetingIcons"> <FontAwesomeIcon icon={faDesktop}/>
    
    </div>
     {/* <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </div>
      <ReactTooltip /> */}

  </div>);

};
// export default MeetingFooter;