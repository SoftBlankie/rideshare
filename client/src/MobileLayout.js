import React from 'react';
import './MobileLayout.css';
import { TabBar } from 'antd-mobile';

import { Button } from 'antd';

const MobileLayout = () => {
  return (
    <TabBar
      unselectedTintColor='#949494'
      tintColor='#33A3F4'
      barTintColor='white'>
      <TabBar.Item title='Life' key='Life'></TabBar.Item>
    </TabBar>
  );
};

export default MobileLayout;
