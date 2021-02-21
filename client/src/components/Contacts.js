import React, { useContext, useState, useEffect } from "react";
import { List, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";
import "./Contacts.css";

const { Panel } = Collapse;

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
        <Collapse className="collapse-parent" expandIconPosition="right">
          {data.map((item, i) => (
            <Panel
              header={item.name}
              key={i}
              className="site-collapse-custom-panel"
            >
              <p>{"Phone: " + item.phone}</p>
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};

export default Contacts;
