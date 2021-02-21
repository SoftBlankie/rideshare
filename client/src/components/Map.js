import React, { useState, useContext } from "react";
import GoogleMapReact from "google-map-react";
import { SearchOutlined, CarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AuthContext } from "./Auth.js";
import app from "./firebase.js";

import randomcolor from "randomcolor";

import FindTripModal from "./FindTripModal";
import PostTripModal from "./PostTripModal";
import DateButton from "./DateButton";

import "./Map.css";
import JoinTripModal from "./JoinTripModal.js";

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
  const [markersMap, setMarkersMap] = useState({});
  const [markers, setMarkers] = useState([]);

  const [activeTrip, setActiveTrip] = useState(null);
  const [joinTrip, setJoinTrip] = useState(false);

  const { currentUser } = useContext(AuthContext);

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
      driver: {
        name: "Smith",
        phone: "23822381",
      },
      time: "02:00 AM",
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
      driver: {
        name: "Joe",
        phone: "238221381",
      },
      time: "02:30 AM",
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
      driver: {
        name: "Adam",
        phone: "23822381",
      },
      time: "02:40 AM",
      date: "02/20/21",
      price: 54,
      notes: "cows only you noob",
    },
  ];

  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  const updateLocation = (pickup, dropoff, date) => {
    let currDrs = drs;
    let currMarkers = markers;
    let currMarkerMap = {};
    let pickupAlt = pickup;
    currDrs.map((dr) => {
      dr.setMap(null);
    });

    currMarkers.map((marker) => {
      marker.setMap(null);
    });

    currMarkers = [];

    currDrs = [];

    setLoading(true);
    // get the main route

    let req = {
      origin: pickup,
      destination: dropoff,
      travelMode: "DRIVING",
    };
    console.log(date);

    directionService.route(req, (res, status) => {
      if (status === "OK") {
        // ping our server and get the routes that fit our parameters
        drMain.setOptions({
          map: map,
          markerOptions: {
            label: "Main",
            zIndex: 100,
          },
        });
        drMain.setDirections(res);
        let colors = randomcolor({
          luminosity: "bright",
          count: mockResponse.length,
        });

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

                app
                  .firestore()
                  .collection("trips")
                  .where("date", "==", date.format("MM/DD/YYYY"))
                  .get()
                  .then((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => doc.data());
                    // time to filter
                    let filteredData = data.filter((trip) => {
                      // calculate distance around pickup
                      let pickupDistance = distance(
                        trip.pickup.lat,
                        trip.pickup.lng,
                        pickupPos.lat,
                        pickupPos.lng
                      );

                      let dropoffDistance = distance(
                        trip.dropoff.lat,
                        trip.dropoff.lng,
                        dropoffPos.lat,
                        dropoffPos.lng
                      );

                      console.log(
                        `${pickupPos.address} vs ${trip.pickup.address}\n Pickup Distance: ${pickupDistance}\n ${dropoffPos.address} vs ${trip.dropoff.address}\n Dropoff Distance: ${dropoffDistance}`
                      );
                      return pickupDistance < 20 && dropoffDistance < 20;
                    });

                    filteredData.map((obj, i) => {
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
                            dr.setOptions({
                              map: map,
                              polylineOptions: {
                                strokeColor: colors[i],
                                strokeOpacity: 0.5,
                              },
                              suppressMarkers: true,
                            });

                            let startMarker = new window.google.maps.Marker({
                              position: new window.google.maps.LatLng(
                                obj.pickup.lat,
                                obj.pickup.lng
                              ),
                              map,
                              title: obj.pickup.address + ` ID: ${i}`,
                            });

                            currMarkerMap[i] = obj;

                            startMarker.addListener("click", () => {
                              let id = startMarker.getTitle().split("ID: ")[1];
                              setActiveTrip(currMarkerMap[id]);
                              setJoinTrip(true);
                              console.log(currMarkerMap[id]);
                            });

                            let endMarker = new window.google.maps.Marker({
                              position: new window.google.maps.LatLng(
                                obj.dropoff.lat,
                                obj.dropoff.lng
                              ),
                              map,
                              title: obj.pickup.address + ` ID: ${i}`,
                            });

                            endMarker.addListener("click", () => {
                              let id = startMarker.getTitle().split("ID: ")[1];
                              setActiveTrip(currMarkerMap[id]);
                              setJoinTrip(true);
                              console.log(currMarkerMap[id]);
                            });

                            // TODO: memory leak, never clear marker

                            currMarkers.push(startMarker);
                            currMarkers.push(endMarker);

                            currDrs.push(dr);
                            dr.setDirections(_res);
                          } else {
                            console.error(status);
                          }
                        }
                      );
                    });
                  });
              } else {
                console.error(status);
              }
            });
          } else {
            console.error(status);
          }
        });

        setMarkersMap(currMarkerMap);
        setMarkers(currMarkers);
        setDrs(currDrs);
        setLoading(false);
        setFindTrip(false);
      } else {
        setLoading(false);
        console.error(status);
      }
    });
  };

  const submitPostTrip = (
    pickup,
    dropoff,
    date,
    price,
    notes,
    time,
    passenger
  ) => {
    setLoading(true);
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

            const driverObj = {
              name: currentProfile.name,
              phone: currentProfile.phone,
            };

            var colRef = app.firestore().collection("trips");
            colRef
              .add({
                driver: driverObj,
                pickup: pickupPos,
                dropoff: dropoffPos,
                date: date.format("MM/DD/YYYY"),
                price: price,
                notes: notes,
                time: time.format("HH:mm A"),
                passengers: 0,
                passengersLimit: passenger,
              })
              .then(() => {
                console.log("Document successfully written!");
                setLoading(false);
                setPostTrip(false);
              })
              .catch((error) => {
                console.log("Error writing document: ", error);
                setLoading(false);
                setPostTrip(false);
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

  const submitJoinTrip = (tripInfo) => {
    console.log(tripInfo);
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
      <DateButton />
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
      <JoinTripModal
        loading={loading}
        visible={joinTrip}
        submitJoinTrip={submitJoinTrip}
        setJoinTrip={setJoinTrip}
        tripInfo={activeTrip}
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
