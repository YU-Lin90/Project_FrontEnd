//隨機  最外層
import RandomButton from './RandomButton';
import TypeChecks from './TypeChecks';
import ShowBox from './ShowBox';
import FlashingBox from './FlashingBox';
import { useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
import DailyTimeCounter from '../DailyTimeCounter';
function Random() {
  /*
  點開隨機=>選取分類=>隨機=>顯示第一次=>倒數時間、顯示獲得的內容 店家名稱、優惠額度=>不要=>第二次=>
  同意=>前往購物
  第三次.....
  50/30/10  2HR       ?
  折價額度 使用期限 使用店家 


  做一個元件 可以放在店家搜尋列的




  */
  const { loginCheckGetFetch } = useFunc();
  //不要的種類 checkBox用
  const [rejectedTypes, setRejectedTypes] = useState(Array(6).fill(false));
  //得到的商店名稱 只有第一間
  const [gettedShopName, setGettedShopName] = useState('');
  //商店列表
  const [radomArrays, setRadomArrays] = useState([]);
  //開始閃爍
  const [startFlashing, setStartFlashing] = useState(false);
  //判斷今天是否超過三次
  const [todayOver, setTodayOver] = useState(false);
  //開啟燈窗
  const [openWindow, setOpenWindow] = useState(false);
  //閃爍結束
  const [flashingEnd, setFlashingEnd] = useState(true);

  const [todayTimes, setTodayTimes] = useState(0);

  const checkTimes = async () => {
    const countToday = await loginCheckGetFetch(
      'DailyCoupon/GetDailyTimes',
      'Member'
    );
    console.log(countToday);
  };

  return (
    <div>
      <p className="homePageLogos">推薦</p>
      <DailyTimeCounter/>
      <div
        className="ta-c pointer fs48 fw6"
        onClick={() => {
          setOpenWindow((v) => !v);
        }}
      >
        開啟抽選
      </div>
      {openWindow ? (
        <>
          <div
            onClick={(e) => {
              // console.log(e.target.id)
              if (e.target.id === 'forCheckIdForRandomBack') {
                setOpenWindow((v) => !v);
              }
            }}
            className="grayBack padV10 padH10"
            id="forCheckIdForRandomBack"
          >
            <div className="onGrayBack padV10 padH10">
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
                flashingEnd={flashingEnd}
                setFlashingEnd={setFlashingEnd}
              />
              {/* <ShowBox gettedShopName={gettedShopName} /> */}
            </div>
          </div>
          {startFlashing ? (
            <FlashingBox
              radomArrays={radomArrays}
              setStartFlashing={setStartFlashing}
              startFlashing={startFlashing}
              setFlashingEnd={setFlashingEnd}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
export default Random;
