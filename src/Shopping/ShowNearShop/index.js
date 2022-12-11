import { useGeo } from '../../Context/GeoLocationProvider';
import { useFunc } from '../../Context/FunctionProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import ChooseShopList from './ChooseShopList';
import NearShopMap from './NearShopMap';
import './ShowNearShop.css';
function ShowNearShop() {
  const { notLoginGetFetch } = useFunc();
  const [myPosition, setMyPosition] = useState({ lat: 0, lng: 0 });
  const [maxDistance, setMaxDistance] = useState(5);
  const [shopDatas, setShopDatas] = useState([]);
  const [choosedShopDatas, setchoosedShopDatas] = useState([]);
  //獲得自己位置
  const checkMyLocation = async () => {
    navigator.geolocation.getCurrentPosition((location) => {
      // console.log(location.coords);
      setMyPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  };

  const getShopDatas = async () => {
    if (myPosition.lat !== 0 && myPosition.lng !== 0 && maxDistance !== 0) {
      const res = await notLoginGetFetch(
        `ShowNearShop/?lat=${myPosition.lat}&lng=${myPosition.lng}&maxDistance=${maxDistance}`
      );
      console.log(res);
      setShopDatas(res);
    }
  };

  useEffect(() => {
    checkMyLocation();
    getShopDatas();
  }, []);
  useEffect(() => {
    getShopDatas();
  }, [myPosition, maxDistance]);
  return (
    <>
      <div className="padV20">
        <div className="disf ShowNearShopFrame">
          <div className="w70p h100p">
            <NearShopMap
              choosedShopDatas={choosedShopDatas}
              myPosition={myPosition}
            />
          </div>
          <div className="w30p">
            <ChooseShopList
              setchoosedShopDatas={setchoosedShopDatas}
              setMaxDistance={setMaxDistance}
              maxDistance={maxDistance}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowNearShop;
