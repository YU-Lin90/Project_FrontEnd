function ChooseShopList({ setMaxDistance, setchoosedShopDatas, maxDistance }) {
  return (
    <>
      <div>
        <div className="marb10 padV10 padH10 ta-c h15p">
          <p>距離(公里)</p>
          <input
            type="number"
            value={maxDistance}
            onChange={(e) => {
              setMaxDistance(e.target.value);
            }}
          />
        </div>
        <div className=" ChooseShopListOption">
          <div className="ChooseShopListCard">
            <p>你家牛排</p>
            <p>地址:台北市信義路一段234號一樓</p>
            <p>外送費:$20</p>
            <p>電話:0912345678</p>
            <p>
              4<i className="fa-solid fa-star fontMainColor"></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChooseShopList;
