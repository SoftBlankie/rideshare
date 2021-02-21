import React, { useState } from "react";
import { Modal, Button, Input, AutoComplete, DatePicker } from "antd";
import moment from "moment";
import "./FindTripModal.css";

const FindTripModal = ({
  loading,
  visible,
  updateLocation,
  setFindTrip,
  autocompleteService,
}) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);

  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

  const autoComplete = (val, ind) => {
    if (!val) {
      console.log("no val");
      ind == 0 ? setPickupSuggestions([]) : setDropoffSuggestions([]);
    } else if (val.length % 3 == 0) {
      // autocomplete
      autocompleteService.getPlacePredictions({ input: val }, (res) => {
        if (res === null) {
          ind == 0 ? setPickupSuggestions([]) : setDropoffSuggestions([]);
          return;
        }
        let newSuggestions = [];
        res.map((addr) => {
          newSuggestions.push({ value: addr.description });
        });
        ind == 0
          ? setPickupSuggestions(newSuggestions)
          : setDropoffSuggestions(newSuggestions);
      });
    }
  };

  const disabledDate = (current) => {
    return current < moment().startOf("day");
  };

  return (
    <Modal
      visible={visible}
      title="Find Trip"
      onOk={() => setFindTrip(false)}
      onCancel={() => setFindTrip(false)}
      footer={[
        <Button key="back" onClick={() => setFindTrip(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => {
            updateLocation(pickup, dropoff, date);
            setPickup("");
            setDropoff("");
            setDate(null);
          }}
        >
          Find
        </Button>,
      ]}
    >
      <div className="form-input">
        <AutoComplete
          options={pickupSuggestions}
          onSearch={(e) => autoComplete(e, 0)}
          onChange={(e) => setPickup(e)}
          value={pickup}
          placeholder="Pickup"
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-input">
        <AutoComplete
          options={dropoffSuggestions}
          onSearch={(e) => autoComplete(e, 1)}
          onChange={(e) => setDropoff(e)}
          value={dropoff}
          placeholder="Dropoff"
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-input">
        <DatePicker
          onChange={(date) => setDate(date)}
          disabledDate={disabledDate}
          value={date}
          style={{ width: "100%" }}
        />
      </div>
    </Modal>
  );
};

export default FindTripModal;
