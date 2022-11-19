//第一段 送餐詳情
import { usePay } from '../../../Context/PayPageContext';

import PayTitleBlock from '../PayTitleBlock';
import { useState } from 'react';
function DeliveDetail() {
  //備註設定
  const {
    deliverMemo,
    setDeliverMemo,
    storeMemo,
    setStoreMemo,
    sendAddress,
    setSendAddress,
  } = usePay();

  const [editAddress, setEditAddress] = useState(false);

  const [editShopMemo, setEditShopMemo] = useState(false);

  const [editDeliverMemo, setEditDeliverMemo] = useState(false);

  return (
    <>
      <div className="payDetailBox">
        <PayTitleBlock number={1} titleString={'送餐詳情'} />
        <div className="marb10 disf jc-sb ai-c">
          <div>
            <p className="fs24 marb10">送達地址:</p>
            {editAddress ? (
              <div>
                <input
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
              <p>{storeMemo}</p>
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
              <p>{deliverMemo}</p>
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
