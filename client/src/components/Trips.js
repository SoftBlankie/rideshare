import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "antd";
import { AuthContext } from "./Auth.js";
import { CaretRightOutlined } from "@ant-design/icons";
import app from "./firebase.js";
import "./Trips.css";

const { Panel } = Collapse;

const Trips = () => {
  const { currentUser, currentData } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setData(doc.data().trips);
      });
  }, []);

  return (
    <div>
      {data !== null && (
        <div>
          <p className="trip-header">Trips</p>
          <Collapse className="collapse-parent" expandIconPosition="right">
            {data.map((item, i) => (
              <Panel
                header={item.date + ", " + item.time + ", " + item.driver.name}
                key={i}
                className="site-collapse-custom-panel"
              >
                <p>{"Driver: " + item.driver.name}</p>
                <p>{"Driver Phone: " + item.driver.phone}</p>
                <p>{"Pickup: " + item.pickup.address}</p>
                <p>{"Destination: " + item.dropoff.address}</p>
                <p>{"Passengers: " + item.passengers}</p>
                <p>{"Price: $" + item.price}</p>
                <p>{"Notes: " + item.notes}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default Trips;
