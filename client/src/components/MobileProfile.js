import React, { useState, useEffect, useContext } from "react";
import { Avatar, List, Button, Image } from 'antd';
import { UserOutlined, EditOutlined, HomeOutlined, PhoneOutlined, PictureOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { AuthContext } from "./Auth";
import HamBurgerMenu from "./HamburgerMenu";
import app from "firebase";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ padding: '3%',textAlign: "left", width: "100%" }}
          type="text"
          block
        >
          
        </Button>
      </Link>

      <Button
        className='edit-profile-button'
        shape='round'
        type='text'
        style = {{position: 'absolute', left: '85%', top:'1.5%'}}
        icon = {<EditOutlined />}
        onClick={editProfileClick}>
      </Button>

      <Avatar
        size={75}
        icon={<PictureOutlined />}
        style={{ display: 'block', borderRadius: '25%', marginTop:'20%',marginBottom: '10%', marginLeft:'auto', marginRight: 'auto', width:'22%', height: '20%' }}
      />

      {currentProfile &&
        <List 
          style = {{marginTop: '10%'}}
        >
          <List.Item>
            <div style={{marginLeft:'5%', fontSize:'200%', fontWeight:''}}><UserOutlined />  {currentProfile.name}</div>
          </List.Item>
          <List.Item>
          <div style={{marginLeft:'5%', fontSize:'200%', fontWeight:''}}><HomeOutlined /> {currentProfile.address}</div>
          </List.Item>
          <List.Item>
          <div style={{marginLeft:'5%', fontSize:'200%', fontWeight:''}}><PhoneOutlined /> {currentProfile.phone}</div>
          </List.Item>
        </List>
      }
    </div>
  );
};

export default Profile;
