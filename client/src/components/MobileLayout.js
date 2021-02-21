import React from "react";
import "./MobileLayout.css";
import { TabBar } from "antd-mobile";

import { Button } from "antd";

import MobileNavBar from "./MobileNavBar";
import HamBurgerMenu from "./HamburgerMenu";
import Map from "./Map";
import DateButton from "./DateButton";

const MobileLayout = () => {
  return (
    <div>
      <MobileNavBar />
    </div>
  );
};

export default MobileLayout;
