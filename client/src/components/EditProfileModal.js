import React from "react";
import { Modal, Button, Input } from "antd";

const FindTripModal = ({ loading, visible, setEditProfile }) => {
  return (
    <Modal
      visible={visible}
      title="Edit Profile"
      onOk={() => updateProfile(email, name, address, phone)}
      onCancel={() => setEditProfile(false)}
      footer={[
        <Button key="back" onClick={() => setEditProfile(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={updateProfile}
        >
          Update
        </Button>,
      ]}
    >
      <Input name="email" defaultValue="email" />
      <Input name="name" defaultValue="name" />
      <Input name="address" defaultValue="address" />
      <Input name="phone" defaultValue="phone" />
    </Modal>
  );
};

export default EditProfileModal;
