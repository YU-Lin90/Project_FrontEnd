import { useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
function RandomButton({ rejectedTypes, setGettedShopName }) {
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
    setGettedShopName(res.name)
  };
  return (
    <>
      <div></div>
      <div
        // rejectedTypes 之後用這個
        onClick={() => {
          const rejectedTypesWithNumber = [];
          rejectedTypes.forEach((v, i) => {
            if (v) rejectedTypesWithNumber.push(i + 1);
          });
          // console.log(rejectedTypesWithNumber);
          getDailyCoupon(rejectedTypesWithNumber);
        }}
        className="ta-c  fs48 fw7 pointer bgcMain"
      >
        Random
      </div>
    </>
  );
}
export default RandomButton;
