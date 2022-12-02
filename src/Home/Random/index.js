//隨機  最外層
import RandomButton from './RandomButton';
import TypeChecks from './TypeChecks';
import ShowBox from './ShowBox';
import FlashingBox from './FlashingBox';
import { useState } from 'react';
function Random() {
  //不要的種類 checkBox用
  const [rejectedTypes, setRejectedTypes] = useState(Array(6).fill(false));
  const [gettedShopName, setGettedShopName] = useState('');
  const [radomArrays, setRadomArrays] = useState([]);
  const [startFlashing, setStartFlashing] = useState(false);
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
