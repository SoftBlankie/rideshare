import React, { useContext } from "react";
import { List } from "antd";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

const Contacts = () => {
  const { currentUser, currentData } = useContext(AuthContext);
  return (
    <List
      className="contacts-list"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={currentData}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
};

export default Contacts;
