import React, { useState, useEffect, useContext } from "react";
import { Avatar, List, Button, Image } from 'antd';
import { UserOutlined, EditOutlined, HomeOutlined, PhoneOutlined, PictureOutlined } from '@ant-design/icons';
import { AuthContext } from "./Auth";
import HamBurgerMenu from "./HamburgerMenu";
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
      <HamBurgerMenu />

      <Avatar
        size={75}
        icon={<PictureOutlined />}
        style={{ display: 'block', marginTop: '10%', marginBottom: '10%', marginLeft:'auto', marginRight: 'auto', width:'22%', height: '20%' }}
      />
      <Button
      block
        className='edit-profile-button'
        shape='round'
        type='primary'
        size='large'
        icon = {<EditOutlined />}
        onClick={editProfileClick}>
        Edit Profile
      </Button>

      {currentProfile &&
        <List 
          style = {{marginTop: '10%'}}
          bordered
        >
          <List.Item>
            <div style={{fontSize:'200%', fontWeight:''}}><UserOutlined />  {currentProfile.name}</div>
          </List.Item>
          <List.Item>
          <div style={{fontSize:'200%', fontWeight:''}}><HomeOutlined /> {currentProfile.address}</div>
          </List.Item>
          <List.Item>
          <div style={{fontSize:'200%', fontWeight:''}}><PhoneOutlined /> {currentProfile.phone}</div>
          </List.Item>
        </List>
      }
    </div>
  );
};

export default Profile;
