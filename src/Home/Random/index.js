//隨機  最外層
import RandomButton from './RandomButton';
import TypeChecks from './TypeChecks';
import ShowBox from './ShowBox';
import FlashingBox from './FlashingBox';
import { useState } from 'react';
function Random() {
  //不要的種類 checkBox用
  const [rejectedTypes, setRejectedTypes] = useState(Array(6).fill(false));
  //得到的商店名稱 只有第一間
  const [gettedShopName, setGettedShopName] = useState('');
  //商店列表
  const [radomArrays, setRadomArrays] = useState([]);
  //開始閃爍
  const [startFlashing, setStartFlashing] = useState(false);

  const [todayOver, setTodayOver] = useState(false);
  return (
    <div>
      <p className="homePageLogos">推薦</p>
      {/* checkBox */}
      <TypeChecks
        rejectedTypes={rejectedTypes}
        setRejectedTypes={setRejectedTypes}
      />
      {/* 確認按鈕 */}
      <RandomButton
        rejectedTypes={rejectedTypes}
        setGettedShopName={setGettedShopName}
        setRadomArrays={setRadomArrays}
        setStartFlashing={setStartFlashing}
        todayOver={todayOver}
        setTodayOver={setTodayOver}
        startFlashing={startFlashing}
      />
      <ShowBox gettedShopName={gettedShopName} />
      {startFlashing ? (
        <FlashingBox
          radomArrays={radomArrays}
          setStartFlashing={setStartFlashing}
          startFlashing={startFlashing}
        />
      ) : null}
    </div>
  );
}
export default Random;
