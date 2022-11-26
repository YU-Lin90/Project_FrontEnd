import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const siteName = window.location.hostname;
function DeliverMap() {
  // const navi = useNavigate();
  const orderSocket = new WebSocket(`ws://${siteName}:3200`);
  function sendToken(sever) {
    const tokenString = localStorage.getItem('Deliver');
    if (!tokenString) {
      window.alert('沒登入');
    }
    sever.send(JSON.stringify({ token: tokenString }));
    // orderChatSocket.send(JSON.stringify({ token: tokenString }))
  }
  orderSocket.addEventListener('open', () => {
    sendToken(orderSocket);
    console.log('訂單系統伺服器連線');
  });

  useEffect(() => {
    return () => {
      orderSocket.close();
      console.log('訂單系統伺服器離線');
    };
  }, []);
  return <></>;
}
export default DeliverMap;
