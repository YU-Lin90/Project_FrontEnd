import React, { useState, useContext, createContext } from 'react';
import Geocode from 'react-geocode';
import keys from '../keys';
const GeoContext = createContext(null);
//https://www.npmjs.com/package/react-geocode
export const GeoLocationProvider = ({ children }) => {
  //計算兩地距離 輸入兩個地址後計算
  Geocode.setApiKey(keys.gmap);
  // Geocode.setApiKey('456465465132156456456');
  Geocode.setLanguage('zh-tw');
  Geocode.setRegion('tw');
  Geocode.setLocationType('ROOFTOP');

  const calculateDistance = async (firstAddress, secondAddress) => {
    const positions = { first: {}, second: {} };
    await Geocode.fromAddress(firstAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        positions.first = response.results[0].geometry.location;
        // console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
    await Geocode.fromAddress(secondAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        positions.second = response.results[0].geometry.location;
        // console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
    // console.log(positions);
    //latitude 緯度差
    const latDistance = positions.first.lat - positions.second.lat;
    //longitude 經度差  X軸
    const lngDistance = positions.first.lng - positions.second.lng;
    //地球半徑 6378.137KM  OR 6371KM
    //設所求點A ，緯度角β1 ，經度角α1 ；點B ，緯度角β2 ，經度角α2。則距離S=R·arc cos[cosβ1cosβ2cos（α1-α2）+sinβ1sinβ2]，其中R為球體半徑。
    const getDistance =
      6378.137 *
      Math.acos(
        Math.cos(
          Math.cos((positions.second.lat * Math.PI) / 180) *
            Math.cos((positions.first.lat * Math.PI) / 180) *
            Math.cos(
              ((positions.first.lng - positions.second.lng) * Math.PI) / 180
            ) +
            Math.sin((positions.second.lat * Math.PI) / 180) *
              Math.sin((positions.first.lat * Math.PI) / 180)
        )
      );
    /*     6371 * acos (
      cos ( radians(25.0259029) )
      * cos( radians( lat ) )
      * cos( radians( lng ) - radians(121.5703875) )
      + sin ( radians(25.0259029) )
      * sin( radians( lat ) )
    ) */
    console.log(getDistance);
    return getDistance;
  };

  return (
    <GeoContext.Provider value={{ calculateDistance }}>
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = () => useContext(GeoContext);
