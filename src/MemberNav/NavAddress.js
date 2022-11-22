import { useState } from 'react';

//NAV 地址
function NavAddress({ sendAddress, setSendAddress }) {
  const [openSetAddress, setOpenSetAddress] = useState(false);
  return (
    <>
      <div className="po-r padH20">
        <p
          className="pointer navAddress"
          onClick={() => {
            // setOpenSetAddress((v) => !v);
            setOpenSetAddress((v) => !v);
          }}
        >
          <span>送到：</span>
          <span style={{ color: '#FF7C7C' }}>
            <i className="fa-solid fa-location-crosshairs fs18 fw6"></i>
          </span>
          <span style={{ color: '#FF7C7C' }} className="fs18 fw6">
            {sendAddress === '' ? '請設定地址' : sendAddress}
          </span>
        </p>
        {openSetAddress ? (
          <div className="bgcW navAddressInputs padV5 padH5">
            <input
              placeholder="請輸入地址"
              onChange={(e) => {
                setSendAddress(e.target.value);
              }}
              className="w300 marH10"
              value={sendAddress}
            />
            <p
              onClick={() => {
                setOpenSetAddress(false);
              }}
              className="flexSetCenter marH10 padV5 padH5 bgcMain pointer "
            >
              確定
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default NavAddress;
