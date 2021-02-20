import React from 'react';

import { Modal, Button, Input } from 'antd';

const FindTripModal = ({ loading, visible, updateLocation, setFindTrip }) => {
  return (
    <Modal
      visible={visible}
      title='Find Trip'
      onOk={updateLocation}
      onCancel={() => setFindTrip(false)}
      footer={[
        <Button key='back' onClick={() => setFindTrip(false)}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={loading}
          onClick={updateLocation}>
          Find
        </Button>,
      ]}>
      <Input placeholder='Pickup' />
      <Input placeholder='Dropoff' />
    </Modal>
  );
};

export default FindTripModal;
