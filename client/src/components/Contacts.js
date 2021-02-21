import React, { useContext } from "react";
import { List } from "antd";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

import logo from "./assets/blackLogo.png"

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
        bodyStyle={{background:"black"}}
      />
      <img
        src={logo}
        alt="blackLogo.png"
        style={{ display: "block", marginRight: "40", width: "30%", paddingTop: 500,opacity: 0.15}}
      />
    </div>
  );
};

export default Contacts;
