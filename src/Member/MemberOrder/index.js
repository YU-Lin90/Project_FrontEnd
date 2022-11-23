//會員現在訂單  開SOCKET用
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberOrder from './MemberOrder';
const siteName = window.location.hostname;
function MemberOrderSocket() {
  const navi = useNavigate();
  const orderSocket = new WebSocket(`ws://${siteName}:3200`);
  const orderChatSocket = new WebSocket(`ws://${siteName}:3001`);
  function sendToken(sever) {
    const tokenString = localStorage.getItem('Member');
    if (!tokenString) {
      alert('沒登入');
      navi(`/MemberLogin`);
    }
    sever.send(JSON.stringify({ token: tokenString }));
    // orderChatSocket.send(JSON.stringify({ token: tokenString }))
  }
  function receiveMessage(e) {
    const datas = JSON.parse(e.data);
    console.log(datas);
  }
  orderSocket.addEventListener('open', () => {
    sendToken(orderSocket);
    console.log('訂單系統伺服器連線');
  });
  orderChatSocket.addEventListener('open', () => {
    sendToken(orderChatSocket);
    console.log('訂單即時對話開始');
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
      console.log('訂單系統伺服器離線');
    };
  }, []);

  return (
    <>
      <MemberOrder />
    </>
  );
}
export default MemberOrderSocket;
