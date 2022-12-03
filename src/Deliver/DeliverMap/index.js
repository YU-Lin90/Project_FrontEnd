//外送員地圖外層 第一層  開SOCKET
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliverMapContent from './DeliverMapContent';
import DeliverChat from './DeliverChat';
const siteName = window.location.hostname;
function DeliverMap() {
  const [socketOpened, setSocketOpened] = useState(false);
  const settedState = true;
  // const navi = useNavigate();
  const orderSocket = useMemo(
    () => new WebSocket(`ws://${siteName}:3200`),
    [settedState]
  );
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
    setSocketOpened(true);
    console.log('訂單系統伺服器連線');
  });

  useEffect(() => {
    return () => {
      orderSocket.close();
      console.log('訂單系統伺服器離線');
    };
  }, []);
  return (
    <div
      className="po-r"
      style={{ width: '100%', minHeight: '500px', height: '600px' }}
    >
      <DeliverMapContent
        orderSocket={orderSocket}
        socketOpened={socketOpened}
      />
      <DeliverChat orderSocket={orderSocket} />

    </div>
  );
}
export default DeliverMap;
