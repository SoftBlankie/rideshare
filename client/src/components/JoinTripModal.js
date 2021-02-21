import React, { useState } from "react";
import { Modal, Button, Divider } from "antd";
import "./FindTripModal.css";

const JoinTripModal = ({
  loading,
  visible,
  submitJoinTrip,
  setJoinTrip,
  tripInfo,
}) => {
  return (
    <div>
      {tripInfo !== null && (
        <Modal
          visible={visible}
          title="Join Trip"
          onOk={() => setJoinTrip(false)}
          onCancel={() => setJoinTrip(false)}
          footer={[
            <Button key="back" onClick={() => setJoinTrip(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => {
                submitJoinTrip(tripInfo);
              }}
            >
              Join
            </Button>,
          ]}
        >
          <div>
            <h2>{tripInfo.driver.name}'s Trip</h2>
            <h3>Pickup Address: {tripInfo.pickup.address}</h3>
            <h3>Dropoff Address: {tripInfo.dropoff.address}</h3>
            <h3>Price: ${tripInfo.price}</h3>
            <h3>
              Time: {tripInfo.time}, {tripInfo.date}
            </h3>
            <h3>
              Passengers: {tripInfo.passengers}/{tripInfo.passengersLimit}
            </h3>
            <h3>Notes: {tripInfo.notes}</h3>
          </div>
        </Modal>
      )}
    </div>
  );
};

/*
Driver's Trip

Pickup Address
Dropoff Address
Price
Date, Time
Notes
*/
export default JoinTripModal;
