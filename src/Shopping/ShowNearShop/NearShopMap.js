import GoogleMapReact from 'google-map-react';
import keys from '../../keys';
function NearShopMap({ myPosition, choosedShopDatas }) {
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: keys.gmap }}
        defaultCenter={myPosition}
        defaultZoom={14}
        center={myPosition}
      ></GoogleMapReact>
    </>
  );
}
export default NearShopMap;
