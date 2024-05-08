import dbRef from "./firebase";
import { store } from "..";

const participantRef = dbRef.child("participants");

export const createOffer = async (peerConnection, createdID, receiverId) => {
  const recieverRef = participantRef.child(receiverId);
  peerConnection.onicecandidate = (event) => {
    event.candidate &&
      recieverRef
        .child("offerCandidates")
        .push({ ...event.candidate.toJSON(), userId: createdID });
  };
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  const offerPayload = {
    sdp: offer.sdp,
    type: offer.type,
    userId: createdID,
  };

  await recieverRef.child("offers").push().set({ offerPayload });
};
//create listeners to recieve offers and send 
export const initializeListensers = async (currentUserId) => {
  const recieverRef = participantRef.child(currentUserId);

  recieverRef.child("offers").on("child_added", async (snapshot) => {
    const data = snapshot.val();
    if (data?.offerPayload) {
        const createrID = data?.offerPayload.userId;
      const peerConnection =store.getState().participants[createrID].peerConnection;
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data?.offerPayload)
      );
      //create answer
      await createAnswer(peerConnection,currentUserId, createrID);
    }
  });

  recieverRef.child("offerCandidates").on("child_added",async (snapshot) => {
    const data = snapshot.val();
    if (data?.userId) {
      const peerConnection = store.getState().participants[data?.userId].peerConnection;
     peerConnection.addIceCandidate(new RTCIceCandidate(data));
      // const peerConnection = participant.peerConnection;
//       if (participant) {
//         if (peerConnection) {
//         } else {
//           console.error(
//             "Peer connection not initialized for participant:",
//             participant
//           );
//         }
//       } else {
//         console.error("Participant not found for userId:", data.userId);
//       }
//     } else {
//       console.error(
//         "Invalid data format or missing currentUserId:",
//         data?.currentUserId
//       );
    }
  });

  recieverRef.child("answers").on("child_added", async(snapshot) => {
    const data = snapshot.val();
    if (data?.answerPayload) {
      const createrId = data?.answerPayload.userId;
      const peerConnection = store.getState().participants[createrId].peerConnection;
      const answerDescription = new RTCSessionDescription(data?.answerPayload);
    await peerConnection.setRemoteDescription(answerDescription);
    }
  });

  recieverRef.child("answerCandidates").on("child_added", async(snapshot) => {
    const data = snapshot.val();
    if (data?.userId) {
      const peerConnection =
        store.getState().participants[data?.userId].peerConnection;
      peerConnection.addIceCandidate(new RTCIceCandidate(data));
    }
  });
};
const createAnswer = async (peerConnection, currentUserId, receiverId) => {
  const recieverRef = participantRef.child(receiverId);
  const answer = await peerConnection.createAnswer();

// const createAnswer = async (otherUserId, userId) => {
//   const peerC = store.getState().participants[otherUserId].peerConnection;


  peerConnection.onicecandidate = (event) => {
    event.candidate &&
      recieverRef
        .child("answerCandidates")
        .push({ ...event.candidate.toJSON(), userId: currentUserId }); //
  };

  await peerConnection.setLocalDescription(answer);

  const answerPayload = {
    sdp: answer.sdp,
    type: answer.type,
    userId: currentUserId,
  };

  await recieverRef.child("answers").push().set({ answerPayload });
};
