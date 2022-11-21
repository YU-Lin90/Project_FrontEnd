//會員現在訂單  開SOCKET用
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberOrder from './MemberOrder';
const siteName = window.location.hostname;
function MemberOrderSocket() {
  const navi = useNavigate();
  const orderSocket = new WebSocket(`ws://${siteName}:3200`);
  function sendToken() {
    const tokenString = localStorage.getItem('Member');
    if (!tokenString) {
      alert('沒登入');
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
      <MemberOrder />
    </>
  );
}
export default MemberOrderSocket;
