import React from "react";
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from "./Auth.js";
import app from "firebase.js";

import EditProfileModal from './EditProfileModal';

const { currentUser, currentData } = useContext(AuthContext);

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const editProfileClick = () => {
    setEditProfile(true);
  };

  const updateProfile = () => {
    var docRef = app.firebase().collection('users').doc(currentUser.uid);
    docRef.set({
      email: email,
      name: name,
      address: address,
      phone: phone
    }).then(() => {
      console.log("Document successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  };

  return (
    <EditProfileModal
      loading={loading}
      visible={editProfile}
      updateProfile={updateProfile}
      setEditProfile={setEditProfile}
    />

    <Avatar size="large" icon={<UserOutlined />} />
    <div>data.name</div>
    <Button
      className='edit-profile-button'
      shape='round'
      type='primary'
      size='large'
      onClick={editProfileClick}>
      Edit Profile
    </Button>
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  );
};

export default Profile;
