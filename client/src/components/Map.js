import React, { useState, useContext } from "react";
import GoogleMapReact from "google-map-react";
import { SearchOutlined, CarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

import randomcolor from "randomcolor";

import FindTripModal from "./FindTripModal";
import PostTripModal from "./PostTripModal";

import "./Map.css";

const defaultMapOptions = {
  fullscreenControl: false,
  zoomControl: false,
  clickableIcons: false,
};

const Map = ({ currentProfile }) => {
  const [findTrip, setFindTrip] = useState(false);
  const [postTrip, setPostTrip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [geocoderService, setGeocoderService] = useState(null);
  const [directionService, setDirectionService] = useState(null);
  const [drMain, setdrMain] = useState(null);
  const [drs, setDrs] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const driverObj = {
    name: currentProfile.name,
    phone: currentProfile.phone
  };

  const findTripClick = () => {
    setFindTrip(true);
  };

  const postTripClick = () => {
    setPostTrip(true);
  };

  const mockResponse = [
    {
      pickup: {
        lat: 37.43551118121617,
        lng: -121.90436153078743,
        address: "258 Fairmeadow Way",
      },
      dropoff: {
        lat: 37.414392403938,
        lng: -121.89598578845893,
        address: "Great Mall",
      },
      date: "02/20/21",
      price: 23,
      notes: "hahahahahaha dogs only",
    },
    {
      pickup: {
        lat: 37.43998103271914,
        lng: -121.91911971961005,
        address: "Random Place",
      },
      dropoff: {
        lat: 37.42051175522907,
        lng: -121.8713285572081,
        address: "McDonalds",
      },
      date: "02/20/21",
      price: 199,
      notes: "cats only!!!!",
    },
    {
      pickup: {
        lat: 37.44724568638508,
        lng: -121.9090303363212,
        address: "Mansion",
      },
      dropoff: {
        lat: 37.42807533908355,
        lng: -121.90647301729413,
        address: "The Best Sandwiches",
      },
      date: "02/20/21",
      price: 54,
      notes: "cows only you noob",
    },
  ];

  const updateLocation = (pickup, dropoff, date) => {
    let currDrs = drs;

    currDrs.map((dr) => {
      dr.setMap(null);
    });

    currDrs = [];

    setLoading(true);
    // get the main route

    let req = {
      origin: pickup,
      destination: dropoff,
      travelMode: "DRIVING",
    };

    directionService.route(req, (res, status) => {
      if (status === "OK") {
        // ping our server and get the routes that fit our parameters
        drMain.setOptions({
          map: map,
          markerOptions: {
            label: "Main",
          },
        });
        drMain.setDirections(res);

        mockResponse.map((obj) => {
          directionService.route(
            {
              origin: new window.google.maps.LatLng(
                obj.pickup.lat,
                obj.pickup.lng
              ),
              destination: new window.google.maps.LatLng(
                obj.dropoff.lat,
                obj.dropoff.lng
              ),
              travelMode: "DRIVING",
            },
            (_res, status) => {
              if (status === "OK") {
                let dr = new window.google.maps.DirectionsRenderer();
                dr.setMap(map);
                currDrs.push(dr);
                dr.setDirections(_res);
              } else {
                console.error(status);
              }
            }
          );
        });

        setDrs(currDrs);
        setLoading(false);
        setFindTrip(false);
      } else {
        setLoading(false);
        console.error(status);
      }
    });
  };

  const submitPostTrip = (pickup, dropoff, date, price, notes, time) => {
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
              address: dropoff,
              lat: res[0].geometry.location.lat(),
              lng: res[0].geometry.location.lng(),
            };

            // PAYLOAD, UPLOAD TO DATABASE
            console.log(driverObj);
            console.log(pickupPos);
            console.log(dropoffPos);
            console.log(date._d);
            console.log(price);
            console.log(notes);

            var colRef = app
              .firestore()
              .collection("trips");
            colRef
              .add({
                driver: driverObj,
                pickup: pickupPos,
                dropoff: dropoffPos,
                date: date.format("MM/DD/YYYY"),
                price: price,
                notes: notes,
                time: time.format("HH:mm A"),
              })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
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
    // save map services

    setMap(map);

    let ac = new window.google.maps.places.AutocompleteService();
    setAutocompleteService(ac);

    let geocoder = new window.google.maps.Geocoder();
    setGeocoderService(geocoder);

    let ds = new window.google.maps.DirectionsService();
    setDirectionService(ds);

    let drMain = new window.google.maps.DirectionsRenderer();

    setdrMain(drMain);
    drMain.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });

          map.setCenter(
            new window.google.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            )
          );
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

    // const startPos = {
    //   lat: 37.43534,
    //   lng: -121.90433,
    // };

    // const endPos = {
    //   lat: 32.86672,
    //   lng: -117.22367,
    // };

    // const endPos2 = {
    //   lat: 37.435381,
    //   lng: -121.904478,
    // };

    // let req = {
    //   origin: new window.google.maps.LatLng(startPos.lat, startPos.lng),
    //   destination: new window.google.maps.LatLng(endPos.lat, endPos.lng),
    //   travelMode: "DRIVING",
    // };

    // ds.route(req, (res, status) => {
    //   if (status == "OK") {
    //     dr.setDirections(res);
    //   }
    // });

    // let req2 = {
    //   origin: new window.google.maps.LatLng(startPos.lat, startPos.lng),
    //   destination: new window.google.maps.LatLng(endPos2.lat, endPos2.lng),
    //   travelMode: "DRIVING",
    // };

    // ds.route(req2, (res, status) => {
    //   if (status == "OK") {
    //     dr1.setDirections(res);
    //   }
    // });

    // var polyline = new maps.Polyline({
    //   path: maps.geometry.encoding.decodePath(json.overview_polyline.points),
    //   map: map,
    // });

    // var bounds = new maps.LatLngBounds();
    // for (var i = 0; i < polyline.getPath().getLength(); i++) {
    //   bounds.extend(polyline.getPath().getAt(i));
    // }

    // map.fitBounds(bounds);
    // setUserLocation(new window.google.maps.LatLng(37.4419, -122.1419));
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
          libraries: ["places", "geocoder", "directions"],
        }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
    </div>
  );
};

export default Map;
