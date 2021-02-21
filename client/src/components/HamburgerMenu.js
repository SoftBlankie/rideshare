import { SELECTION_INVERT } from "antd/lib/table/hooks/useSelection";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Drawer, Menu, Button } from "antd";
import { BoldOutlined, MenuOutlined } from "@ant-design/icons";
import MobileNavBar from "./MobileNavBar";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./HamburgerMenu.css";
import { TabBar } from "antd-mobile";

import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

class HamBurgerMenu extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onSignOut = () => {
    app.auth().signOut();
  };

  render() {
    var profileName = this.props.name;

    return (
      <div className="site-drawer-render-in-current-wrapper">
        <div style={{ marginTop: 0 }}>
          <Button
            icon={<MenuOutlined />}
            className="hamburger-button"
            // type 'ghost' if we want outline around button
            type="text"
            size="large"
            onClick={this.showDrawer}
          ></Button>
        </div>
        <div className="drawer-div">
          <Drawer
            width="75%"
            title={profileName}
            placement="left"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            getContainer={false}
            style={{ position: "absolute" }}
          >
            <Link to="/profile">
              <Button
                style={{ textAlign: "left", width: "100%" }}
                type="text"
                block
                onClick={() => this.handleProfileRedirect}
              >
                Profile
              </Button>
            </Link>
            <Button
              style={{ textAlign: "left", width: "100%" }}
              type="text"
              block
              onClick={() => this.props.handleTab("mapTab")}
            >
              Map
            </Button>
            <Button
              style={{ textAlign: "left", width: "100%" }}
              type="text"
              block
              onClick={() => this.props.handleTab("tripsTab")}
            >
              Trips
            </Button>
            <Button
              style={{ textAlign: "left", width: "100%" }}
              type="text"
              block
              onClick={() => this.props.handleTab("contactsTab")}
            >
              Contacts
            </Button>
            <Button
              style={{ textAlign: "left", width: "100%" }}
              type="text"
              block
            >
              Settings
            </Button>
            <Button
              style={{ textAlign: "left", width: "100%" }}
              type="text"
              block
            >
              Sign Out
            </Button>
          </Drawer>
        </div>
      </div>
    );
  }
}

// Exporting the component
export default HamBurgerMenu;
