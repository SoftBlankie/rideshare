import React, { useContext } from "react";
import { List } from "antd";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

const Trips = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <List
      className="trips-list"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={currentUser}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
};

export default Trips;
