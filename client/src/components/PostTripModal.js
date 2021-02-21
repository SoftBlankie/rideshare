import React, { useState } from "react";
import moment from "moment";
import {
  Modal,
  Button,
  Input,
  AutoComplete,
  DatePicker,
  InputNumber,
  TimePicker,
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
  const [price, setPrice] = useState(null);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

  const autoComplete = (val, ind) => {
    if (!val) {
      ind == 0 ? setPickupSuggestions([]) : setDropoffSuggestions([]);
    } else {
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
      title="Post Trip"
      onOk={() => {
        setPickup("");
        setDropoff("");
        setPrice(null);
        setPassenger(null);
        setNotes("");
        setTime(null);
        setDate(null);
      }}
      onCancel={() => setPostTrip(false)}
      footer={[
        <Button key="back" onClick={() => setPostTrip(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => {
            setPickup("");
            setDropoff("");
            setPrice(null);
            setNotes("");
            setTime(null);
            setDate(null);

            setPassenger(null);
            submitPostTrip(
              pickup,
              dropoff,
              date,
              price,
              notes,
              time,
              passenger
            );
          }}
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
          value={pickup}
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-input">
        <AutoComplete
          options={dropoffSuggestions}
          onSearch={(e) => autoComplete(e, 1)}
          onChange={(e) => setDropoff(e)}
          placeholder="Dropoff"
          value={dropoff}
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-input">
        <DatePicker
          onChange={(date) => setDate(date)}
          disabledDate={disabledDate}
          style={{ width: "50%" }}
          value={date}
        />

        <TimePicker
          onChange={(time) => setTime(time)}
          use12Hours
          style={{ width: "50%" }}
          placeholder="Time"
          format="HH:mm A"
          value={time}
        />
      </div>

      <div className="form-input">
        <InputNumber
          placeholder="Price"
          style={{ width: "50%" }}
          onChange={setPrice}
          value={price}
        />
        <InputNumber
          placeholder="Passenger Limit"
          style={{ width: "50%" }}
          onChange={setPassenger}
          value={passenger}
        />
      </div>

      <div className="form-input">
        <Input.TextArea
          rows={4}
          placeholder="Notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
    </Modal>
  );
};

export default FindTripModal;
