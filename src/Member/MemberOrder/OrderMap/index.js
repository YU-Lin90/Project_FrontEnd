import { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import keys from '../../../keys';
const AnyReactComponent = () => <div>{123}</div>;
function OrderMap({ selectedOrder, orderShowNow }) {
  const [position, setPosition] = useState({ lat: 25.03359, lng: 121.54349 });
  const googleMaps = useRef(null);
  const defaultProps = {
    center: {
      lat: 25.03359,
      lng: 121.54349,
    },
    zoom: 15,
  };
  //25.03359696638214, 121.5434922509409
  return (
    <>
      <GoogleMapReact
        // TODO 之後再打開 不然會浪費額度
        // bootstrapURLKeys={{ key: keys.gmap }}
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={position.lat}
          lng={position.lng}
          text="My Marker"
        />
      </GoogleMapReact>

      <button
        onClick={() => {
          setPosition({ lat: 25.18309, lng: 121.44458 });
        }}
      >
        test
      </button>
    </>
  );
}
export default OrderMap;
