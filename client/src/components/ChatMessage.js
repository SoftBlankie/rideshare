import React from "react";
import { AuthContext } from "./Auth.js";
import app from "firebase.js";

const { currentUser, currentData } = useContext(AuthContext);

const messagesRef = app.firestore().collection('messages').where(uid, '==', currentUser.uid).where('receiver', '==', receiver.uid);
const query = messagesRef.orderBy('createdAt').limit(25);
const [messages] = useCollectionData(query, {idField: 'id'});

const ChatMessage = (text, uid) => {
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
