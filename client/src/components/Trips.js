import React, { useContext } from "react";
import { Collapse } from "antd";
import { AuthContext } from "./Auth.js";
import { CaretRightOutlined } from "@ant-design/icons";
import app from "./firebase.js";

const { Panel } = Collapse;

const Trips = () => {
  const { currentUser } = useContext(AuthContext);
  const mockData = [
    {
      pickup: {
        lat: 23,
        lng: 180,
        address: "Great Mall",
      },
      destination: {
        lat: 23,
        lng: 180,
        address: "The best sandwiches ever",
      },
      driver: "Adam Sope",
      price: 13,
      date: "02/21/21",
      notes: "djasiojxoajiodjwqojdon",
    },
  ];

  return (
    <Collapse defaultActiveKey={["1"]}>
      {mockData.map((item, i) => (
        <Panel
          header={item.pickup.address}
          key={i}
          className="site-collapse-custom-panel"
        >
          <p>{item.pickup.address}</p>
        </Panel>
      ))}
    </Collapse>
  );
};

export default Trips;
