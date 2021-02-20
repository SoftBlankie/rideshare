import { SELECTION_INVERT } from 'antd/lib/table/hooks/useSelection';
import React from 'react';

import { Drawer, Menu, Button } from 'antd';

import './HamburgerMenu.css';


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
      <div className='site-drawer-render-in-current-wrapper'>
        Render in this
        <div style={{ marginTop: 16 }}>
            <Button
               // TODO  
               // Having trouble changing the icon of this button
            className='hamburger-button'
            type='primary'
            onClick={this.showDrawer}>
            Open
          </Button>
        </div>
        <Drawer
          title='Edward Robertson'
          placement='left'
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
          style={{ position: 'absolute' }}>
          {/* TODO these don't have to be buttons, can be drawers or something else, also want to make them in list form  */}
          <Button>
              Profile
          </Button>
          <Button>
              Payment
          </Button>
          <Button>
              Settings
          </Button>
        </Drawer>
      </div>
    );
  }
}

// Exporting the component
export default HamBurgerMenu;
