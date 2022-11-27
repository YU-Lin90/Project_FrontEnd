//會員現在訂單 地圖層
import { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import CycleContent from './CycleContent';
import keys from '../../../keys';
import { useGeo } from '../../../Context/GeoLocationProvider';
import { useFunc } from '../../../Context/FunctionProvider';
const SelfPositionIcon = () => (
  <div>
    <i className="fa-solid fa-location-dot fontMainColor mapTranslate fs48"></i>
  </div>
);
const StorePositionIcon = () => (
  <div>
    <i className="fa-solid fa-store fontMainColor mapTranslate fs48"></i>
  </div>
);
function OrderMap({ selectedOrder, orderSocket }) {
  const { loginCheckGetFetch } = useFunc();
  const { calculateDistance, calculateDistanceByLatLng, getLatLngByAddress } =
    useGeo();
  //店家位置
  const [storePosition, setStorePosition] = useState({
    lat: 25.03359,
    lng: 121.54349,
  });
  //外送員位置
  const [deliverPosition, setDeliverPosition] = useState({
    lat: 25.03359,
    lng: 121.54349,
  });
  //自己位置
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
    //獲得現在位置 然後傳到裡面的函式
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location.coords);
      setDeliverPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  };

  const getStoreLocation = async (orderSid) => {
    const res = await loginCheckGetFetch(
      `MemberMapDetails/GetStoreDetail/?orderSid=${orderSid}`,
      'Member'
    );
    const gettedStorePosition = await getLatLngByAddress(res.address);
    console.log({ gettedStorePosition });
    console.log({ res });
    setStorePosition(gettedStorePosition)
  };

  useEffect(() => {
    // setInterval(checkLocation, 1000);
    checkLocation();
    getStoreLocation(selectedOrder);
    return () => {
      // clearInterval(intervalTest);
    };
  }, []);
  useEffect(() => {
    getStoreLocation(selectedOrder);
  }, [selectedOrder]);
  /* location.coords.longitude
  location.coords.latitude
   */
  //===============================================分隔線================================================
  //訊息監聽
  /* {
    "position": true,
    "lat": 25.012723125816077,
    "lng": 121.51290893554688,
    "receiveSid": 1,
    "receiveSide": 1,
    "orderSid": 1
  } */
  function receiveMessage(e) {
    const datas = JSON.parse(e.data);
    console.log(datas);
    if (datas.orderSid === selectedOrder)
      setDeliverPosition({ lat: datas.lat, lng: datas.lng });
  }
  useEffect(() => {
    orderSocket.addEventListener('message', receiveMessage);
    console.log('openListener');
    return () => {
      orderSocket.removeEventListener('message', receiveMessage);
      console.log('closeListener');
    };
  }, []);
  //===============================================分隔線================================================
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
        <SelfPositionIcon
          lat={positionNow.lat}
          lng={positionNow.lng}
          text="Member"
        />
        <CycleContent
          lat={deliverPosition.lat}
          lng={deliverPosition.lng}
          text="Deliver"
        />
        <StorePositionIcon
          lat={storePosition.lat}
          lng={storePosition.lng}
          text="Store"
        />
      </GoogleMapReact>

      <button
        onClick={() => {
          // setDeliverPosition({
          //   lat: deliverPosition.lat + 1.0001,
          //   lng: deliverPosition.lng + 1.0001,
          // });

          calculateDistance('廣州街觀光夜市', '第一家禽批發市場');

          // setPosition({ lat: 25.18309, lng: 121.44458 });
        }}
      >
        test
      </button>
    </>
  );
}
export default OrderMap;
