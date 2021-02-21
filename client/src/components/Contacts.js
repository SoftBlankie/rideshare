import React, { useContext, useState, useEffect } from "react";
import { List } from "antd";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

import "./Contacts.css";

const Contacts = () => {
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setData(doc.data().contacts);
      });
  }, []);

  return (
    <div>
      <p className="contacts-header">Contacts</p>
      {data !== null && (
        <List
          className="contacts-list"
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              {item.name}: {item.phone}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Contacts;
