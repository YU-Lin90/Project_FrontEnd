//地圖上聊天按鈕
import { useEffect, useState } from 'react';
import { useSVG } from '../../../Context/SVGProvider';
import OrderChattingBox from './OrderChattingBox';
function ChatOnOrderMap({ selectedOrder, step, orderSocket }) {
  const { chatSVG } = useSVG();
  const [openChat, setOpenChat] = useState(false);
  const [acceptedMessage, setAcceptedMessage] = useState({});
  function receiveMessage(e) {
    const datas = JSON.parse(e.data);
    console.log('聊天室訊息');
    console.log(datas);
    if (datas.msg) {
      console.log('有訊息');
    }
  }
  useEffect(() => {
    orderSocket.addEventListener('message', receiveMessage);
    console.log('openListener');
    return () => {
      orderSocket.removeEventListener('message', receiveMessage);
      console.log('closeListener');
    };
  }, []);
  return (
    <>
      <div
        onClick={() => {
          setOpenChat((v) => !v);
        }}
        className="orderChatButton"
      >
        <div className="orderChatButtonSVGFrame">
          {chatSVG('strokeMainColor h30 w100p')}
        </div>
      </div>
      {openChat ? (
        <OrderChattingBox
          setOpenChat={setOpenChat}
          acceptedMessage={acceptedMessage}
          selectedOrder={selectedOrder}
        />
      ) : null}
    </>
  );
}
export default ChatOnOrderMap;
