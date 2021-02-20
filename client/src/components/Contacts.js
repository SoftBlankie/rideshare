import React from "react";
import { List } from "antd";
import { AuthContext } from "./Auth.js";
import app from "firebase.js";

const { currentUser, currentData } = useContext(AuthContext);

const Contacts = () => {
  return (
    <List
      className="contacts-list"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={currentData}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  );
};

export default Contacts;
