import RandomButton from './RandomButton';
import TypeChecks from './TypeChecks';
import ShowBox from './ShowBox';
import { useState } from 'react';
function Random() {
  //不要的種類 checkBox用
  const [rejectedTypes, setRejectedTypes] = useState(Array(6).fill(false));
  const [gettedShopName, setGettedShopName] = useState('');
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
      />
      <ShowBox gettedShopName={gettedShopName} />
    </div>
  );
}
export default Random;
