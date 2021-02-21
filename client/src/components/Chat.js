import React from "react";
import { List, Input } from 'antd';
import { AuthContext } from "./Auth.js";
import app from "firebase.js";

const { currentUser, currentData } = useContext(AuthContext);

const messagesRef = app.firestore().collection('messages').where(uid, '==', currentUser.uid).where('receiver', '==', receiver.uid);
const query = messagesRef.orderBy('createdAt').limit(25);
const [messages] = useCollectionData(query, {idField: 'id'});

const Chat = () => {
  return (
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>
    <Input placeholder='Send a message'/>
    <Button>Send</Button>
  );
};

export default Chat;
