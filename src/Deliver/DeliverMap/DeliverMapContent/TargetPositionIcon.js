import { useState } from 'react';

function TargetPositionIcon({ targetName, targetAddress, sideNow }) {
  const [openDetail, setOpenDetail] = useState(false);
  return (
    <>
      <div className="deliverMapTargetIconBox">
        {!openDetail ? (
          <div className=" deliverMapTargetTextBox">
            <p className="fs24 fw5">{sideNow === 2 ? '店家' : '客戶'}資訊</p>
            <p className="deliverMapTargetName">{targetName}</p>
            <p className="deliverMapTargetAddress">{targetAddress}</p>
          </div>
        ) : null}
        <p
          onClick={() => {
            setOpenDetail((v) => !v);
          }}
          className="deliverMapTargetIcon h50 w50 pointer"
        >
          <i className="fa-solid fa-location-dot fontMainColor mapTranslate fs48"></i>
        </p>
      </div>
    </>
  );
}
export default TargetPositionIcon;
