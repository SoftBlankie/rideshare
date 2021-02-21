import React, { useState } from "react";
import moment from "moment";
import {
  Modal,
  Button,
  Input,
  AutoComplete,
  DatePicker,
  InputNumber,
} from "antd";

import "./PostTripModal.css";

const FindTripModal = ({
  loading,
  visible,
  setPostTrip,
  submitPostTrip,
  autocompleteService,
}) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [price, setPrice] = useState(0);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

  const autoComplete = (val, ind) => {
    if (!val) {
      ind == 0 ? setPickupSuggestions([]) : setDropoffSuggestions([]);
    } else {
      // autocomplete
      autocompleteService.getPlacePredictions({ input: val }, (res) => {
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
    return current < moment().endOf("day");
  };

  return (
    <Modal
      visible={visible}
      title="Post Trip"
      onOk={() => setPostTrip(false)}
      onCancel={() => setPostTrip(false)}
      footer={[
        <Button key="back" onClick={() => setPostTrip(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => submitPostTrip(pickup, dropoff, date, price, notes)}
        >
          Post
        </Button>,
      ]}
    >
      <div className="form-input">
        <AutoComplete
          options={pickupSuggestions}
          onSearch={(e) => autoComplete(e, 0)}
          onChange={(e) => setPickup(e)}
          placeholder="Pickup"
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-input">
        <AutoComplete
          options={dropoffSuggestions}
          onSearch={(e) => autoComplete(e, 1)}
          onChange={(e) => setDropoff(e)}
          placeholder="Dropoff"
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-input">
        <DatePicker
          onChange={(date) => setDate(date)}
          disabledDate={disabledDate}
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-input">
        <InputNumber
          placeholder="Price"
          style={{ width: "100%" }}
          onChange={setPrice}
        />
      </div>

      <div className="form-input">
        <Input.TextArea
          rows={4}
          placeholder="Notes"
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default FindTripModal;
