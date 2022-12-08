//訂單 WS 第一層 有輸入框的頁面 不跟店家對話.
import { useEffect, useState } from 'react';
import ChatContent from './ChatContent';
const siteName = window.location.hostname;
function OrderChat({
  socket, //WS
  orderSid, //訂單SID
  mySide, //自己是哪邊 1 / 3
  targetSid, //對方SID
  sideName, //自己是哪邊 Member   Deliver
  targetSide, //對方是哪邊 1 / 3
  setStyle,
}) {
  //輸入對話的內容
  const [inputContent, setInputContent] = useState('');
  //收到的新內容
  const [newContent, setNewContent] = useState({ newMsg: false, content: {} });
  function receiveMessage(e) {
    // const datas = JSON.parse(e.data);
    setNewContent({ newMsg: true, content: e.data });
    // console.log(datas);
  }

  useEffect(() => {
    socket.addEventListener('message', receiveMessage);
    console.log('openListener');
    return () => {
      socket.removeEventListener('message', receiveMessage);
      console.log('closeListener');
    };
  }, []);
  function sendData() {
    console.log(targetSid);
    const sendString = {
      deliveMsg: inputContent.trim(),
      receive_sid: targetSid,
      receive_side: targetSide,
      orderSid: orderSid,
    };
    if (sendString.deliveMsg === '') {
      return;
    }
    socket.send(JSON.stringify(sendString));
  }
  return (
    <div
      className="w100p disf fd-c jc-sb"
      style={{
        background: `url(http://${siteName}:3001/images/chatroomBackground.jpg) center center / cover`,
        boxShadow: '0 4px 12px  rgba(0,0,0,0.08)',
        ...setStyle,
      }}
    >
      <div className="orderChattingBox">
        <ChatContent
          newContent={newContent}
          setNewContent={setNewContent}
          targetSide={targetSide}
          orderSid={orderSid}
          mySide={mySide}
          targetSid={targetSid}
          sideName={sideName}
        />
      </div>
      <div className=" padV15 padH5 notAdminChatInputFrame">
        <div className="flexSetCenter padH5 w80p">
          <input
            className="chattingRoomInput w100p"
            autoFocus
            value={inputContent}
            onChange={(e) => {
              setInputContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputContent !== '') {
                // console.log('enter');
                sendData();
                setInputContent('');
              }
            }}
          />
        </div>
        <div
          className="chattingRoomButton w20p ta-c"
          onClick={() => {
            sendData();
            setInputContent('');
          }}
        >
          傳送
        </div>
      </div>
    </div>
  );
}
export default OrderChat;
