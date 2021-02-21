import React, { useState, useEffect, useContext } from "react";
import { Avatar, List, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from "./Auth";
import app from "firebase";

import EditProfileModal from './EditProfileModal';

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    var docRef = app.firestore().collection('users').doc(currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentProfile(doc.data());
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser]);

  const editProfileClick = () => {
    setEditProfile(true);
  };

  const updateProfile = (name, address, phone) => {
    var docRef = app.firebase().collection('users').doc(currentUser.uid);
    docRef.set({
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
    <div>
      {currentProfile &&
        <EditProfileModal
          loading={loading}
          visible={editProfile}
          currentProfile={currentProfile}
          updateProfile={updateProfile}
          setEditProfile={setEditProfile}
        />
      }

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
        dataSource={currentProfile}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default Profile;
