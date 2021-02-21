import React, { useState, useContext } from "react";
import GoogleMapReact from "google-map-react";
import { SearchOutlined, CarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

import FindTripModal from "./FindTripModal";
import PostTripModal from "./PostTripModal";

import "./Map.css";

const defaultMapOptions = {
  fullscreenControl: false,
  zoomControl: false,
  clickableIcons: false,
};

const Map = () => {
  const [findTrip, setFindTrip] = useState(false);
  const [postTrip, setPostTrip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [geocoderService, setGeocoderService] = useState(null);

  // TODO authenticate needed
  //const { currentUser, currentData } = useContext(AuthContext);
  const currentUser = {
    uid: 0
  }

  const findTripClick = () => {
    setFindTrip(true);
  };

  const postTripClick = () => {
    setPostTrip(true);
  };

  const updateLocation = (pickup, dropoff) => {
    setLoading(true);
    setTimeout(
      () => {
        setLoading(false);
        setFindTrip(false);
      },
      3000,
      [pickup, dropoff]
    );
  };

  const submitPostTrip = (pickup, dropoff, date, price, notes) => {
    geocoderService.geocode({ address: pickup }, (res, status) => {
      if (status == "OK") {
        let pickupPos = {
          address: pickup,
          lat: res[0].geometry.location.lat(),
          lng: res[0].geometry.location.lng(),
        };
        geocoderService.geocode({ address: dropoff }, (res, status) => {
          if (status == "OK") {
            let dropoffPos = {
              address: pickup,
              lat: res[0].geometry.location.lat(),
              lng: res[0].geometry.location.lng(),
            };

            // PAYLOAD, UPLOAD TO DATABASE
            console.log(pickupPos);
            console.log(dropoffPos);
            console.log(date);
            console.log(price);
            console.log(notes);

            var docRef = app.firestore().collection('trips').doc(currentUser.uid);
            docRef.set({
              pickup: pickupPos,
              dropoff: dropoffPos,
              date: date,
              price: price,
              notes: notes
            }).then(() => {
              console.log("Document successfully written!");
            }).catch((error) => {
              console.log("Error writing document: ", error);
            });
          } else {
            console.error(status);
          }
        });
      } else {
        console.error(status);
      }
    });
  };

  const handleApiLoaded = (map, maps) => {
    // get markers (all the drop offs and stuff from server)
    let ac = new window.google.maps.places.AutocompleteService();
    setAutocompleteService(ac);

    let geocoder = new window.google.maps.Geocoder();
    setGeocoderService(geocoder);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          const marker = new window.google.maps.Marker({
            position: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            map,
            title: "Current Location",
            icon: "https://i.imgur.com/x0edsoW.png",
          });
        },
        () => {
          setUserLocation({ lat: 0, lng: 0 });
        }
      );
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <FindTripModal
        loading={loading}
        visible={findTrip}
        updateLocation={updateLocation}
        setFindTrip={setFindTrip}
        autocompleteService={autocompleteService}
      />
      <PostTripModal
        loading={loading}
        visible={postTrip}
        setPostTrip={setPostTrip}
        submitPostTrip={submitPostTrip}
        autocompleteService={autocompleteService}
      />
      <div className="button-group">
        <Button
          className="find-trip-button"
          shape="round"
          type="primary"
          icon={<SearchOutlined />}
          size="large"
          onClick={findTripClick}
        >
          Find Trip
        </Button>
        <Button
          className="find-trip-button"
          shape="round"
          type="primary"
          icon={<CarOutlined />}
          size="large"
          onClick={postTripClick}
        >
          Post Trip
        </Button>
      </div>

      <GoogleMapReact
        options={defaultMapOptions}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API,
          libraries: ["places", "geocoder"],
        }}
        defaultCenter={{
          lat: 0,
          lng: 0,
        }}
        center={userLocation}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
    </div>
  );
};

export default Map;
