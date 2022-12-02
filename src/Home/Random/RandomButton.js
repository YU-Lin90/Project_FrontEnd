//按鈕
import { useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
import Swal from 'sweetalert2';
function RandomButton({
  rejectedTypes,
  setGettedShopName,
  setRadomArrays,
  setStartFlashing,
  todayOver,
  setTodayOver,
  startFlashing,
  flashingEnd,
  setFlashingEnd,
}) {
  const { loginCheckPostFetch } = useFunc();

  //獲得店家函式 輸入不要的種類(陣列) 回傳1筆店家
  const getDailyCoupon = async (types) => {
    const postData = JSON.stringify(types);
    const res = await loginCheckPostFetch(
      `DailyCoupon/GetRandomStoreWithType`,
      'Member',
      postData
    );
    console.log(res);
    //開始閃爍
    setStartFlashing(true);
    //放進資料列
    setRadomArrays(res.shopList);
    //放進第0個
    setGettedShopName(res.shopList[0].name);
    //今天超過次數的狀態
    if (res.over) {
      setTodayOver(true);
    }
  };
  return (
    <>
      <div></div>
      <div
        // rejectedTypes 之後用這個
        onClick={() => {
          if (!flashingEnd) {
            return;
          }
          const rejectedTypesWithNumber = [];
          rejectedTypes.forEach((v, i) => {
            //這裡有!是正向選擇(選要的)   沒有!是反向選擇(選不要的)
            if (v) rejectedTypesWithNumber.push(i + 1);
          });
          // console.log(rejectedTypesWithNumber);
          setFlashingEnd(false);
          getDailyCoupon(rejectedTypesWithNumber);
        }}
        className={`homeStartRandomButtom ta-c  fs48 fw7 pointer bgcMain  ${
          flashingEnd ? '' : 'active'
        }`}
      >
        Random
      </div>
    </>
  );
}
export default RandomButton;
