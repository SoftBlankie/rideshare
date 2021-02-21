import React, { useContext } from "react";
import { List } from "antd";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

import './Contacts.css';

const Contacts = () => {
  const { currentUser } = useContext(AuthContext);

  var dummyContacts = [
    { name: 'Adam', phone: '1234567890' },
    { name: "Demi", phone: '1234567891' },
  ];

  return (
    <div>
      <p className='contacts-header'>Contacts</p>
      <List
        className="contacts-list"
        bordered
        dataSource={dummyContacts}
        renderItem={(item) =>
          <List.Item>{item.name}</List.Item>
        }
      />
    </div>
  );
};

export default Contacts;
