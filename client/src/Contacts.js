import React from "react";
import { List } from 'antd';
import { AuthContext } from "./Auth.js";
import app from "firebase.js";

const { currentUser } = useContext(AuthContext);

var data;
var docRef = app.firebase().collection.doc(currentUser.uid);
docRef.get().then(doc) => {
  if (doc.exists) {
    data = doc.data();
    console.log("Document data:", data);
  } else {
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

const Contacts = () => {
  return (
    <List
      className='contacts-list'
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  );
};

export default Contacts;
