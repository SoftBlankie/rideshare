import React from 'react';
import './MobileLayout.css';
import { TabBar } from 'antd-mobile';

import { Button } from 'antd';

import MobileNavBar from './MobileNavBar';
import HamBurgerMenu from './HamburgerMenu'
import Map from './Map';

const MobileLayout = () => {
  return (
    <div> 
      <HamBurgerMenu/>
      <MobileNavBar/>
    </div>
  );
};

export default MobileLayout;
