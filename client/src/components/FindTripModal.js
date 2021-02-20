import React, { useState } from 'react';

import { Modal, Button, Input } from 'antd';
import './FindTripModal.css';

const FindTripModal = ({ loading, visible, updateLocation, setFindTrip }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  return (
    <Modal
      visible={visible}
      title='Find Trip'
      onOk={() => setFindTrip(false)}
      onCancel={() => setFindTrip(false)}
      footer={[
        <Button key='back' onClick={() => setFindTrip(false)}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={loading}
          onClick={() => updateLocation(pickup, dropoff)}>
          Find
        </Button>,
      ]}>
      <div className='form-input'>
        <Input
          placeholder='Pickup'
          onChange={(e) => setPickup(e.target.value)}
        />
      </div>
      <div className='form-input'>
        <Input
          placeholder='Dropoff'
          onChange={(e) => setDropoff(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default FindTripModal;
