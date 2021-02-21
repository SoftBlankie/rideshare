import React, { useState, useEffect, useContext } from "react";
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import { isMobile } from 'react-device-detect';
import MobileLayout from './components/MobileLayout';
import Login from "./components/MobileLogin";
import Signup from "./components/MobileSignup";
import { AuthContext, AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import app from "./components/firebase"

function App() {
  const [currentUser] = useContext(AuthContext);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    var docRef = app.firestore().collection('users').doc(currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentProfile(doc.data);
          console.log("Document data:", doc.data);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser]);

  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={isMobile && MobileLayout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
