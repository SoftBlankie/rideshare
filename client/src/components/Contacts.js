import React, { useContext } from "react";
import { List, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";
import './Contacts.css';

const { Panel } = Collapse;

const Contacts = () => {
  const { currentUser } = useContext(AuthContext);

  var dummyContacts = [
    { name: 'Adam Sope', phone: '1234567890' },
    { name: "Thomas Lane", phone: '1565378691' },
    { name: "Jessica Lu", phone: '4565277892' },
    { name: "Rico Giovani", phone: '12742363251' },
    { name: "Aerith Tonte", phone: '1234567891' },
  ];

  return (
    <div>
      <p className="contacts-header">Contacts</p>
      <Collapse
        className="collapse-parent"
        expandIconPosition="right"
      >
        {dummyContacts.map((item, i) => (
          <Panel
            header={item.name}
            key={i}
            className="site-collapse-custom-panel"
          >
            <p>{"Phone: " + item.phone}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Contacts;
