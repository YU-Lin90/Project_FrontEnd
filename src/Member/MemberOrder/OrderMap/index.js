//會員現在訂單 地圖層 這裡一個監聽器
import { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
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
const DeliverPosition = () => (
  <div>
    <i className="fs48 fa-solid fa-motorcycle fontMainColor mapTranslate cycleFontOnMap"></i>
  </div>
);
function OrderMap({ selectedOrder, orderSocket, step }) {
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
    lat: 0,
    lng: 0,
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
  const checkLocation = async (orderSid) => {
    //獲得現在位置 然後傳到裡面的函式
    //TODO 這裡要改成訂單上面的位置
    const res = await loginCheckGetFetch(
      `MemberMapDetails/GetOrderAddress/?orderSid=${orderSid}`,
      'Member'
    );
    console.log(res.receive_address);
    const gettedOrderPosition = await getLatLngByAddress(res.receive_address);
    console.log(gettedOrderPosition);
    setPositionNow(gettedOrderPosition);
  };

  const getStoreLocation = async (orderSid) => {
    const res = await loginCheckGetFetch(
      `MemberMapDetails/GetStoreDetail/?orderSid=${orderSid}`,
      'Member'
    );
    const gettedStorePosition = await getLatLngByAddress(res.address);
    console.log({ gettedStorePosition });
    console.log({ res });
    setStorePosition(gettedStorePosition);
  };

  // useEffect(() => {
  //   // setInterval(checkLocation, 1000);
  //   //
  //   getStoreLocation(selectedOrder);
  //   return () => {
  //     // clearInterval(intervalTest);
  //   };
  // }, []);
  useEffect(() => {
    checkLocation(selectedOrder);
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
    console.log('收到外送員位置');
    console.log(datas);
    if (
      datas.orderSid === selectedOrder &&
      datas.lat &&
      datas.lng &&
      step === 4
    ) {
      console.log('in');
      setDeliverPosition({ lat: datas.lat, lng: datas.lng });
    }
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
        bootstrapURLKeys={{ key: keys.gmap }}
        // bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={positionNow}
      >
        <SelfPositionIcon
          lat={positionNow.lat}
          lng={positionNow.lng}
          text="Member"
        />
        {step === 4 &&
        deliverPosition.lat !== 0 &&
        deliverPosition.lng !== 0 ? (
          <DeliverPosition
            lat={deliverPosition.lat}
            lng={deliverPosition.lng}
            text="Deliver"
          />
        ) : null}

        <StorePositionIcon
          lat={storePosition.lat}
          lng={storePosition.lng}
          text="Store"
        />
      </GoogleMapReact>
    </>
  );
}
export default OrderMap;
