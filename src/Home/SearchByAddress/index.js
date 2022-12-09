import { usePay } from '../../Context/PayPageContext';
import { useGeo } from '../../Context/GeoLocationProvider';
import { useNavigate } from 'react-router-dom';
const siteName = window.location.hostname;
function SearchByAddress() {
  const { sendAddress, setSendAddress } = usePay();
  const { getAddressByLatLng } = useGeo();
  const navi = useNavigate();
  const getAddress = async () => {
    const address = await getAddressByLatLng();
    // console.log(address);
    setSendAddress(address.address);
    localStorage.setItem('DeliveAddress', address.address);
  };
  return (
    <div
      className="homeAddressFrame"
      style={{
        background: `url(http://${siteName}:3001/images/sideFood.jpg) center center / cover no-repeat`,
      }}
    >
      <p
        onClick={() => {
          localStorage.setItem(
            'DeliveAddress',
            '台北市大安區復興南路一段390號2樓'
          );
          setSendAddress('台北市大安區復興南路一段390號2樓');
        }}
        className="fs36 fw6 marb20 homeAddressSlogan"
      >
        各式美食 上千種商品 馬上點馬上到
      </p>
      <div className="padV20 padH20 homeAddressInputsFrame">
        <div className="w75p marr10">
          <input
            style={{
              width: '100%',
              border: '1px solid blue',
              lineHeight: ' 28px',
              fontSize: '18px',
              borderRadius: '15px',
              paddingInlineStart: '15px',
              paddingInlineEnd: '15px',
            }}
            value={sendAddress}
            onChange={(e) => {
              localStorage.setItem('DeliveAddress', e.target.value);
              setSendAddress(e.target.value);
            }}
            placeholder="請輸入您要送達的地址"
          />
        </div>
        <div className="disf ai-c jc-se gap10 w25p">
          <div>
            <i
              onClick={() => {
                getAddress();
              }}
              className="fa-solid fontMainColor fa-location-crosshairs fs18 fw6 pointer"
            ></i>
          </div>

          <div
            onClick={() => {
              navi(
                '/Shopping?search=&price_max=&price_min=&order=distance&wait_time=80'
              );
            }}
            className="payPageButton"
          >
            外送
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchByAddress;
