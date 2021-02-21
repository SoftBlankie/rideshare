import React, { useState, useEffect, useContext } from "react";
import { Avatar, List, Button, Image } from 'antd';
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

      <Avatar
        size={150}
        icon={<UserOutlined />}
        style={{ width:150, height: 150 }}
      />
      <Button
        className='edit-profile-button'
        shape='round'
        type='primary'
        size='large'
        onClick={editProfileClick}>
        Edit Profile
      </Button>

      {currentProfile &&
        <List
          bordered
        >
          <List.Item>
            <div>Name</div>
            {currentProfile.name}
          </List.Item>
          <List.Item>
            <div>Address</div>
            {currentProfile.address}
          </List.Item>
          <List.Item>
            <div>Phone</div>
            {currentProfile.phone}
          </List.Item>
        </List>
      }
    </div>
  );
};

export default Profile;
