//第一段 送餐詳情
import { usePay } from '../../../Context/PayPageContext';
import { useFunc } from '../../../Context/FunctionProvider';
import PayTitleBlock from '../PayTitleBlock';
import { useEffect, useState } from 'react';
function DeliveDetail() {
  const { notLoginGetFetch } = useFunc();
  //備註設定
  const {
    deliverMemo,
    setDeliverMemo,
    storeMemo,
    setStoreMemo,
    sendAddress,
    setSendAddress,
    waitTime,
    setWaitTime,
    chooseedPayShop,
    cartContents,
  } = usePay();

  const [editAddress, setEditAddress] = useState(false);

  const [editShopMemo, setEditShopMemo] = useState(false);

  const [editDeliverMemo, setEditDeliverMemo] = useState(false);

  const checkWaitTime = async () => {
    const time = await notLoginGetFetch(
      `PayGetWaitTime/?sid=${chooseedPayShop}`
    );
    setWaitTime(time);
  };
  useEffect(() => {
    // TODO:之後再打開
    // checkWaitTime();
  }, []);
  return (
    <>
      <div className="payDetailBox">
        <PayTitleBlock number={1} titleString={'送餐詳情'} />
        <div className="marb10 disf jc-sb ai-c">
          <p>店家名稱:{cartContents.cartList[chooseedPayShop].shopName}</p>
          <p>店家現在等待時間:{waitTime}分鐘</p>
        </div>
        <div className="marb10 disf jc-sb ai-c">
          <div>
            <p className="fs24 marb10">送達地址:</p>
            {editAddress ? (
              <div>
                <input
                  className="w100p"
                  value={sendAddress}
                  onChange={(e) => {
                    setSendAddress(e.target.value);
                  }}
                />
              </div>
            ) : (
              <p className="fs18">{sendAddress}</p>
            )}
          </div>
          <div
            className="payPageButton"
            onClick={() => {
              setEditAddress((v) => !v);
            }}
          >
            {editAddress ? '儲存' : '修改'}
          </div>
        </div>
        <div className="marb10 disf jc-sb ai-c">
          <div>
            <p className="fs24 marb10">店家備註</p>
            {editShopMemo ? (
              <div>
                <input
                  value={storeMemo}
                  onChange={(e) => {
                    setStoreMemo(e.target.value);
                  }}
                />
              </div>
            ) : (
              <p>{storeMemo === '' ? '無' : storeMemo}</p>
            )}
          </div>

          <div
            className="payPageButton"
            onClick={() => {
              setEditShopMemo((v) => !v);
            }}
          >
            {editShopMemo ? '儲存' : '修改'}
          </div>
        </div>
        <div className="marb10 disf jc-sb ai-c">
          <div>
            <p className="fs24 marb10">外送員備註</p>
            {editDeliverMemo ? (
              <div>
                <input
                  value={deliverMemo}
                  onChange={(e) => {
                    setDeliverMemo(e.target.value);
                  }}
                />
              </div>
            ) : (
              <p>{deliverMemo === '' ? '無' : deliverMemo}</p>
            )}
          </div>
          <div
            className="payPageButton"
            onClick={() => {
              setEditDeliverMemo((v) => !v);
            }}
          >
            {editDeliverMemo ? '儲存' : '修改'}
          </div>
        </div>
      </div>
    </>
  );
}
export default DeliveDetail;
