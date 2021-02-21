import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const EditProfileModal = ({
  loading,
  visible,
  currentProfile,
  updateProfile,
  setEditProfile,
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [address, setAddress] = useState(currentProfile.address);
  const [phone, setPhone] = useState(currentProfile.phone);

  return (
    <Modal
      visible={visible}
      title='Edit Profile'
      onOk={() => updateProfile(name, address, phone)}
      onCancel={() => setEditProfile(false)}
      footer={[
        <Button key='back' onClick={() => setEditProfile(false)}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={loading}
          onClick={updateProfile}>
          Update
        </Button>,
      ]}>
      <Input
        name='name'
        defaultValue={currentProfile.name}
        onChange={setName}
      />
      <Input
        name='address'
        defaultValue={currentProfile.address}
        onChange={setAddress}
      />
      <Input
        name='phone'
        defaultValue={currentProfile.phone}
        onChange={setPhone}
      />
    </Modal>
  );
};

export default EditProfileModal;
