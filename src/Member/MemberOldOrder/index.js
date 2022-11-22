import { useEffect } from 'react';
import './OldOrder.css';
function MemberOldOrder() {
  useEffect(() => {}, []);
  return (
    <div>
      <p className="marb20">過往訂單</p>
      <div name="訂單整體外框">
        {/* //===============================================分隔線================================================ */}
        <div name="單個訂單外框" className="w100p marb20 oldOrderFrame">
          <div className="w100p  padV20 padH20 disf oldOrderTopDetail">
            <div className="w20p">圖片</div>
            <div className="w60p disf fd-c jc-se fw6 fs18">
              <p>訂單編號：</p>
              <p>店名</p>
              <p>2022年11月22日</p>
            </div>
            <div className="w20p disf fd-c ai-c jc-se gap10">
              <p className="fw6 fs18">$388</p>
              <div className="disf fd-c">
                <p className="oldOrderCommand">重新下單</p>
                <div>
                  <p className="oldOrderCommand">給予店家評價</p>
                </div>
                <div>
                  <p className="oldOrderCommand">給予外送評價</p>
                </div>
              </div>
            </div>
          </div>
          <div name="查看細節" className=" padV20 padH20 h50">
            <p>查看細節(5個品項)</p>
            <div className="fontMainColor">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>
        {/* //===============================================分隔線================================================ */}

        {/* //===============================================分隔線================================================ */}
      </div>
    </div>
  );
}
export default MemberOldOrder;
