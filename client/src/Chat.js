import React from "react";
import { List } from 'antd';
import { AuthContext } from "./Auth.js";
import app from "firebase.js";

const { currentUser, currentData } = useContext(AuthContext);

const messagesRef = app.firestore().collection('messages').where(uid, '==', currentUser.uid).where('receiver', '==', );
const query = messagesRef.orderBy('createdAt').limit(25);
const [messages] = useCollectionData(query, {idField: 'id'});

const Chat = () => {
  return (
    <List
      className='chat-list'
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={currentData}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  );
};

export default Chat;
