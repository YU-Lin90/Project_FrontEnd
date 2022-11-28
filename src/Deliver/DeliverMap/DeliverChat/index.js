//外送員地圖上聊天按鈕
import { useEffect, useState } from 'react';
import { useSVG } from '../../../Context/SVGProvider';
import DeliverChatBox from './DeliverChatBox';
function DeliverChat({ selectedOrder = 1, step, orderSocket }) {
  const { chatSVG } = useSVG();
  const [openChat, setOpenChat] = useState(false);
  const [acceptedMessage, setAcceptedMessage] = useState({});
  function receiveMessage(e) {
    const datas = JSON.parse(e.data);
    console.log('聊天室訊息');
    console.log(datas);
    if (datas) {
      console.log('有訊息');
      setAcceptedMessage(datas);
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
        <DeliverChatBox
          setOpenChat={setOpenChat}
          acceptedMessage={acceptedMessage}
          selectedOrder={selectedOrder}
          orderSocket={orderSocket}
          step={step}
        />
      ) : null}
    </>
  );
}
export default DeliverChat;
