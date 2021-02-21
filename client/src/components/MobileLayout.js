import React, { useState, useEffect, useContext } from "react";
import "./MobileLayout.css";
import { TabBar } from "antd-mobile";

import { Button } from "antd";

import MobileNavBar from "./MobileNavBar";
import HamBurgerMenu from "./HamburgerMenu";
import Map from "./Map";
import DateButton from "./DateButton";

import { AuthContext } from "./Auth";
import app from "./firebase";

const MobileLayout = () => {
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

  return (
    <div>
      <MobileNavBar currentProfile={currentProfile} />
    </div>
  );
};

export default MobileLayout;
