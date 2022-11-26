//結帳頁最外層 開Socket
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';
import Pay from './Pay';
const siteName = window.location.hostname;
//===============================================分隔線================================================
function PaySocket() {
  const navi = useNavigate();
  const orderSocket = new WebSocket(`ws://${siteName}:3200`);
  function sendToken() {
    const tokenString = localStorage.getItem('Member');
    if (!tokenString) {
      window.alert('沒登入');
      navi(`/MemberLogin`);
    }
    orderSocket.send(JSON.stringify({ token: tokenString }));
  }
  function receiveMessage(e) {
    const datas = JSON.parse(e.data);
    console.log(datas);
  }
  orderSocket.addEventListener('open', () => {
    sendToken();
    console.log('start');
  });
  useEffect(() => {
    orderSocket.addEventListener('message', receiveMessage);
    console.log('openListener');
    return () => {
      orderSocket.removeEventListener('message', receiveMessage);
      console.log('closeListener');
    };
  }, []);
  useEffect(() => {
    return () => {
      orderSocket.close();
      console.log('end');
    };
  }, []);
  return (
    <>
      <Pay orderSocket={orderSocket} />
    </>
  );
}
export default PaySocket;
