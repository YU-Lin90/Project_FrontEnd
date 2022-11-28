//外送員 地圖
import { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useGeo } from '../../../Context/GeoLocationProvider';
import keys from '../../../keys';
import { useFunc } from '../../../Context/FunctionProvider';
const Cycle = () => (
  <div>
    <i className="fs48 fa-solid fa-motorcycle fontMainColor mapTranslate cycleFontOnMap"></i>
  </div>
);
const TargetPosition = () => (
  <div>
    <i className="fa-solid fa-location-dot fontMainColor mapTranslate fs48"></i>
  </div>
);
const buttonText = ['', '送達', '取餐'];
function DeliverMapContent({
  //現在跟哪方對話
  side = 2,
  //現在的訂單SID
  orderSid = 1,
  //聊天室
  orderSocket,
  //會員SID
  memberSid = 1,
  //聊天室開啟狀態
  socketOpened,
}) {
  const { loginCheckGetFetch } = useFunc();
  const { calculateDistance, calculateDistanceByLatLng, getLatLngByAddress } =
    useGeo();
  const [buttonStatus, setButtonStatus] = useState(true);
  //目標位置
  const [targetPosition, setTargetPosition] = useState({
    lat: 25.03359,
    lng: 121.54349,
  });
  //自己位置
  const [deliverPosition, setDeliverPosition] = useState({
    lat: 0,
    lng: 0,
  });
  //對方地址
  const [targetAddress, setTargetAddress] = useState('');
  //預設狀態
  const defaultProps = {
    center: {
      lat: 25.03359,
      lng: 121.54349,
    },
    zoom: 15,
  };
  //檢查是否抵達 控制按鈕是否可以點(送達/取餐)
  const checkArraive = async () => {
    if (deliverPosition.lat !== 0) {
      const distance = await calculateDistanceByLatLng(
        deliverPosition,
        targetPosition
      );
      if (distance < 0.15) {
        setButtonStatus(false);
      } else {
        setButtonStatus(true);
      }
      console.log(distance);
    }
  };
  //獲得對方位置函式
  const getAddress = async () => {
    if (orderSid === 0) {
      return;
    }
    const res = await loginCheckGetFetch(
      `deliving/GetAddress?side=${side}&orderSid=${orderSid}`,
      'Deliver'
    );
    console.log(res);
    //  side
    /* {
    "receive_address": "台北市信義路一段1號",
    "shopName": "I’m PASTA 和平店",
    "address": "台北市和平東路二段118巷50號 ",
    "memberName": "ゆう"
    } */
    //依照是哪方設定地址
    const address = side === 1 ? res.receive_address : res.address;
    console.log(address);
    //由地址獲得座標
    const coordinate = await getLatLngByAddress(address);
    console.log(coordinate);
    setTargetPosition(coordinate);
    setTargetAddress(address);
  };
  //===============================================分隔線================================================
  const checkMyLocation = async () => {
    //獲得現在位置 然後傳到裡面的函式
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location.coords);
      setDeliverPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  };
  //每秒定位 OK 1126/2315
  // TODO 製作聊天室中暫時關閉
  // useEffect(() => {
  //   const intervals = setInterval(checkMyLocation, 1000);
  //   getAddress();
  //   return () => {
  //     clearInterval(intervals);
  //   };
  // }, []);
  //位置有改變時傳送位置訊息
  //orderSocket memberSid
  //  JSON.stringify({position:true,lat:deliverPosition.lat,lng:deliverPosition.lng ,receiveSid:memberSid,receiveSide:side,orderSid:orderSid})
  //    {position:true,lat:deliverPosition.lat,lng:deliverPosition.lng ,receiveSid:memberSid,receiveSide:side,orderSid:orderSid}
  useEffect(() => {
    if (socketOpened) {
      orderSocket.send(
        JSON.stringify({
          position: true,
          lat: deliverPosition.lat,
          lng: deliverPosition.lng,
          receiveSid: memberSid,
          receiveSide: side,
          orderSid: orderSid,
        })
      );
    }
    checkArraive();
  }, [deliverPosition]);
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
        <TargetPosition
          lat={targetPosition.lat}
          lng={targetPosition.lng}
          text="target"
        />
        <Cycle
          lat={deliverPosition.lat}
          lng={deliverPosition.lng}
          text="My Marker"
        />
      </GoogleMapReact>
      <button disabled={buttonStatus}>{buttonText[side]}</button>
    </>
  );
}
export default DeliverMapContent;
