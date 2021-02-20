import React from 'react';
import GoogleMapReact from 'google-map-react';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const handleApiLoaded = (map, maps) => {
  // get markers (all the drop offs and stuff from server)
};

const Map = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Button shape='round' type='primary' icon={<SearchOutlined />} size={10}>
        Find Trip
      </Button>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33,
        }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          handleApiLoaded(map, maps)
        }></GoogleMapReact>
    </div>
  );
};

export default Map;
