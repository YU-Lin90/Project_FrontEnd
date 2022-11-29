//地圖上聊天按鈕  訂單SOCKET監聽器在這裡
import { useEffect, useState } from 'react';
import { useSVG } from '../../../Context/SVGProvider';
import OrderChattingBox from './OrderChattingBox';
import Swal from 'sweetalert2';
const alertMessages = ['', '', '店家已接單', '店家已完成', '外送員已取餐'];
function ChatOnOrderMap({ setStep, selectedOrder, step, orderSocket }) {
  const { chatSVG } = useSVG();
  //開啟聊天室
  const [openChat, setOpenChat] = useState(false);
  //聊天傳遞
  const [acceptedMessage, setAcceptedMessage] = useState({});
  //接單傳遞
  const [acceptedStepMessage, setAcceptedStepMessage] = useState({});
  function receiveMessage(e) {
    const datas = JSON.parse(e.data);
    console.log('訊息');
    console.log(datas);
    /**{
      "receiveSide": 1,
      "receiveSid": 1,
      "step": 3,
      "orderSid": 172
  } */
    //確認店家、外送員 是否有動作
    // 2製作中 3已完成 4運送中
    if (datas.step) {
      setAcceptedStepMessage(datas);
    } else if (datas.deliveMsg) {
      setAcceptedMessage(datas);
    }
  }

  useEffect(() => {
    if (
      acceptedStepMessage.step &&
      selectedOrder === acceptedStepMessage.orderSid
    ) {
      console.log(123);
      Swal.fire(alertMessages[acceptedStepMessage.step]);
      setStep(acceptedStepMessage.step);
    }
  }, [acceptedStepMessage]);
  useEffect(() => {
    setAcceptedStepMessage({});
  }, [selectedOrder]);

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
          orderSocket={orderSocket}
          step={step}
        />
      ) : null}
    </>
  );
}
export default ChatOnOrderMap;
