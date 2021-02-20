import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { SearchOutlined, CarOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import FindTripModal from './FindTripModal';

import './Map.css';

const defaultMapOptions = {
  fullscreenControl: false,
  zoomControl: false,
  clickableIcons: false,
};

const Map = () => {
  const [findTrip, setFindTrip] = useState(false);
  const [postTrip, setPostTrip] = useState(false);
  const [loading, setLoading] = useState(false);

  const findTripClick = () => {
    setFindTrip(true);
  };

  const postTripClick = () => {
    setPostTrip(true);
  };

  const updateLocation = () => {};

  const handleApiLoaded = (map, maps) => {
    // get markers (all the drop offs and stuff from server)
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <FindTripModal
        loading={loading}
        visible={findTrip}
        updateLocation={updateLocation}
        setFindTrip={setFindTrip}
      />
      <div className='button-group'>
        <Button
          className='find-trip-button'
          shape='round'
          type='primary'
          icon={<SearchOutlined />}
          size='large'
          onClick={findTripClick}>
          Find Trip
        </Button>
        <Button
          className='find-trip-button'
          shape='round'
          type='primary'
          icon={<CarOutlined />}
          size='large'
          onClick={postTripClick}>
          Post Trip
        </Button>
      </div>

      <GoogleMapReact
        options={defaultMapOptions}
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
