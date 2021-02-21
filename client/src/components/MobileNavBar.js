import { TabBar } from "antd-mobile";
import { SELECTION_INVERT } from "antd/lib/table/hooks/useSelection";
import Map from "./Map";
import React from "react";
import HamBurgerMenu from "./HamburgerMenu";
import Trips from "./Trips";
import Contacts from "./Contacts";
import DateButton from "./DateButton";

class MobileNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "mapTab",
      //selectedDate: '',
      hidden: false,
      fullScreen: true,
    };
  }

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
      </div>
    );
  }

  handleTab = (tab) => {
    this.setState({ selectedTab: tab });
  };

  handleDate = (newDate) => {
    this.setState({ selectedDate: newDate });
  };

  render() {
    return (
      <div
        style={
          this.state.fullScreen
            ? { position: "fixed", height: "100%", width: "100%", top: 0 }
            : { height: 400 }
        }
      >
        <DateButton handleDate={this.handleDate}/>
        <HamBurgerMenu handleTab={this.handleTab} />

        <TabBar
          unselectedTintColor="black"
          tintColor="black"
          //barTintColor="#85DCB0"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="Map"
            key="Map"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  // https://opensource.org/licenses/MIT liscense for the image below
                  background: `url(${process.env.PUBLIC_URL}/assets/mapNavBarIcon.png) center center /  21px 21px no-repeat`,
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${process.env.PUBLIC_URL}/assets/mapNavBarIconClicked.png) center center /  21px 21px no-repeat`,
                }}
              />
            }
            selected={this.state.selectedTab === "mapTab"}
            onPress={() => {
              this.setState({
                selectedTab: "mapTab",
              });
            }}
            data-seed="logId"
          >
            <Map />
          </TabBar.Item>
          <TabBar.Item
            title="Trips"
            key="Trips"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${process.env.PUBLIC_URL}/assets/tripsNavBarIcon.png) center center /  21px 21px no-repeat`,
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${process.env.PUBLIC_URL}/assets/tripsNavBarIconClicked.png) center center /  21px 21px no-repeat`,
                }}
              />
            }
            // can use badge to show how many trips we have
            badge={4}
            //dot
            selected={this.state.selectedTab === "tripsTab"}
            onPress={() => {
              this.setState({
                selectedTab: "tripsTab",
              });
            }}
            data-seed="logId1"
          >
            {/* <Trips /> */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${process.env.PUBLIC_URL}/assets/contactsNavBarIcon.png) center center /  21px 21px no-repeat`,
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: `url(${process.env.PUBLIC_URL}/assets/contactsNavBarIconClicked.png) center center /  21px 21px no-repeat`,
                }}
              />
            }
            title="Contacts"
            key="Contacts"
            // can use badge to show how many messages
            badge={4}
            selected={this.state.selectedTab === "contactsTab"}
            onPress={() => {
              this.setState({
                selectedTab: "contactsTab",
              });
            }}
          >
            {/* <Contacts /> */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

// Exporting the component
export default MobileNavBar;
