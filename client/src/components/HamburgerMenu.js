import { SELECTION_INVERT } from "antd/lib/table/hooks/useSelection";
import React, { useState } from "react";

import { Drawer, Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import MobileNavBar from "./MobileNavBar";

import "./HamburgerMenu.css";
import { TabBar } from "antd-mobile";

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

  render() {
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
        <Drawer
          width="35%"
          title="Edward Robertson"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
          style={{ position: "absolute" }}
        >
          <div style={{ marginTop: "10%" }}></div>
          <Button block>Profile</Button>
          <Button block onClick={() => this.props.handleTab("mapTab")}>
            Map
          </Button>
          <Button block onClick={() => this.props.handleTab("tripsTab")}>
            Trips
          </Button>
          <Button block onClick={() => this.props.handleTab("contactsTab")}>
            Contacts
          </Button>
          <Button block>Settings</Button>
        </Drawer>
      </div>
    );
  }
}

// Exporting the component
export default HamBurgerMenu;
