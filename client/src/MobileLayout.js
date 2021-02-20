import React from 'react';
import './MobileLayout.css';
import { TabBar } from 'antd-mobile';

import { Button } from 'antd';
import MobileNavBar from './MobileNavBar'

const MobileLayout = () => {
  return (
    <div> 
      <MobileNavBar/>
    </div>
  );
};

export default MobileLayout;
