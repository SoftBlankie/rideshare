import React, { useEffect, useState } from "react";
import app from "./firebase.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      var data;
      var docRef = app.firebase().collection.doc(user.uid);
      docRef.get().then(doc) => {
        if (doc.exists) {
          data = doc.data();
          console.log("Document data:", data);
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      setCurrentUser(user)
      setCurrentData(data)
      setPending(false)
    });
  }, []);

  if (pending) {
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
