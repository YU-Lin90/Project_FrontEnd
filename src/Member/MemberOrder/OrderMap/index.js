import { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import CycleContent from './CycleContent';
import keys from '../../../keys';
const SelfPosition = () => (
  <div>
    <i className="fa-solid fa-location-dot fontMainColor mapTranslate fs48"></i>
  </div>
);
function OrderMap({ selectedOrder, orderShowNow }) {
  const [position, setPosition] = useState({ lat: 25.03359, lng: 121.54349 });
  const [deliverPosition, setDeliverPosition] = useState({
    lat: 25.03359,
    lng: 121.54349,
  });
  const [positionNow, setPositionNow] = useState({
    lat: 25.03359,
    lng: 121.54349,
  });
  const defaultProps = {
    center: {
      lat: 25.03359,
      lng: 121.54349,
    },
    zoom: 15,
  };
  const checkLocation = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location.coords);
      setDeliverPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  };
  // const intervalTest = setInterval(() => {
  //   setDeliverPosition({
  //     lat: deliverPosition.lat + 0.0001,
  //     lng: deliverPosition.lng + 0.0001,
  //   });
  // }, 1000);
  //25.03359696638214, 121.5434922509409
  useEffect(() => {
    // setInterval(checkLocation, 1000);
    checkLocation()
    return () => {
      // clearInterval(intervalTest);
    };
  }, []);
  /* location.coords.longitude
  location.coords.latitude
   */
  return (
    <>
      <GoogleMapReact
        // TODO 之後再打開 不然會浪費額度
        bootstrapURLKeys={{ key: keys.gmap }}
        // bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={deliverPosition}
      >
        <SelfPosition
          lat={positionNow.lat}
          lng={positionNow.lng}
          text="My Marker"
        />
        <CycleContent
          lat={deliverPosition.lat}
          lng={deliverPosition.lng}
          text="My Marker"
        />
      </GoogleMapReact>

      <button
        onClick={() => {
          setDeliverPosition({
            lat: deliverPosition.lat + 1.0001,
            lng: deliverPosition.lng + 1.0001,
          });
          // setPosition({ lat: 25.18309, lng: 121.44458 });
        }}
      >
        test
      </button>
    </>
  );
}
export default OrderMap;
