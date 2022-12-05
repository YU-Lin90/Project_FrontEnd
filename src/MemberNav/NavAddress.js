import { useState } from 'react';
import { useLocation } from 'react-router-dom';

//NAV 地址
function NavAddress({ sendAddress, setSendAddress }) {
  const location = useLocation();
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
          <span className="fw6">{sendAddress === '' ? '' : '送到：'}</span>
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
              autoFocus={true}
              className="w300 marH10"
              value={sendAddress}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setOpenSetAddress(false);
                }
              }}
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
