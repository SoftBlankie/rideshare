import React, { useContext } from "react";
import { Collapse } from "antd";
import { AuthContext } from "./Auth.js";
import { CaretRightOutlined } from "@ant-design/icons";
import app from "./firebase.js";
import "./Trips.css";
import logo from "./assets/blackLogo.png"
const { Panel } = Collapse;

const Trips = () => {
  const { currentUser, currentData } = useContext(AuthContext);
  const mockData = [
    {
      pickup: {
        lat: 23,
        lng: 180,
        address: "447 Great Mall Dr, Milpitas, CA 95035",
      },
      destination: {
        lat: 23,
        lng: 180,
        address: "187 S Main St, Milpitas, CA 95035",
      },
      driver: "Adam Sope",
      passengers: 3,
      price: 13,
      date: "2/21/21",
      time: "02:00 PM",
      notes: "I have a dog!",
    },

    {
      pickup: {
        lat: 23,
        lng: 180,
        address: "5245 Mowry Ave, Fremont, CA 94538",
      },
      destination: {
        lat: 23,
        lng: 180,
        address: "99 N Milpitas Blvd, Milpitas, CA 95035",
      },
      driver: "Thomas Lane",
      passengers: 1,
      price: 5,
      date: "3/3/21",
      time: "07:30 PM",
      notes: "Rap music is the best music.",
    },

    {
      pickup: {
        lat: 23,
        lng: 180,
        address: "940 Great Mall Dr, Milpitas, CA 95035",
      },
      destination: {
        lat: 23,
        lng: 180,
        address: "1507 N Milpitas Blvd, Milpitas, CA 95035",
      },
      driver: "Jessica Lu",
      passengers: 2,
      price: 7,
      date: "5/15/21",
      time: "12:30 PM",
      notes: "",
    },

    {
      pickup: {
        lat: 23,
        lng: 180,
        address: "774 S Main St, Milpitas, CA 95035",
      },
      destination: {
        lat: 23,
        lng: 180,
        address: "11525 Sorrento Valley Rd STE A, San Diego, CA 92121",
      },
      driver: "Rico Giovani",
      passengers: 4,
      price: 20,
      date: "5/23/21",
      time: "11:00 AM",
      notes: "Drives a black Toyota Corolla.",
    },
  ];
  function callback(key) {
    console.log(key);
  }
  return (
    <div>
      <p className="trip-header">Trips</p>
      <Collapse
        className="collapse-parent"
        expandIconPosition="right"
        onChange={callback}
      >
        {mockData.map((item, i) => (
          <Panel
            header={item.date + ", " + item.time + ", " + item.driver}
            key={i}
            className="site-collapse-custom-panel"
          >
            <p>{"Pickup: " + item.pickup.address}</p>
            <p>{"Destination: " + item.destination.address}</p>
            <p>{"Passengers: " + item.passengers}</p>
            <p>{"Price: $" + item.price}</p>
            <p>{"Notes: " + item.notes}</p>
          </Panel>
        ))}
      </Collapse>
      <img
        src={logo}
        alt="blackLogo.png"
        style={{ display: "block", marginRight: "40", width: "30%", paddingTop: 406}}
      />
    </div>
  );
};

export default Trips;
