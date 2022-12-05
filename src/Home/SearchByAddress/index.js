import { usePay } from '../../Context/PayPageContext';
function SearchByAddress() {
  const { sendAddress, setSendAddress } = usePay();
  return (
    <div className="homeAddressSlogan">
      <p
        onClick={() => {
          setSendAddress('台北市大安區復興南路一段390號2樓');
        }}
        className="fs36 fw5 marb20"
      >
        各式美食 馬上點馬上到
      </p>
      <div className="padV20 padH20 homeAddressInputsFrame">
        <div className="w500">
          <input
            style={{
              width: '500px',
              border: '1px solid blue',
              lineHeight: ' 28px',
              fontSize: '18px',
              borderRadius: '15px',
              paddingInlineStart: '15px',
              paddingInlineEnd: '15px',
            }}
            value={sendAddress}
            onChange={(e) => {
              setSendAddress(e.target.value);
            }}
            placeholder="請輸入您要送達的地址"
          />
        </div>
        <div>外送</div>
      </div>
    </div>
  );
}
export default SearchByAddress;
