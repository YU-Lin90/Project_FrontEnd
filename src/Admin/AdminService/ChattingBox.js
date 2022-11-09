//WS 第四層 有輸入框的頁面
import { useEffect, useState } from 'react';
import ChatContent from './ChatContent';

function ChattingBox({
  setChattingPerson,
  setChatting,
  chattingPerson,
  socket,
}) {
  const [inputContent, setInputContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const { sid, side } = chattingPerson;

  useEffect(() => {
    socket.addEventListener('message', (e) => {
      //回傳的資料
      //let sendData = { "msg": content, "name": map.get(ws).name, "post_side": postSide, "post_sid": postSid, "receive_side": receiveSide, "receive_sid": receiveSid, "time": timeNow /*[,"read",true已讀]*/};

      const datas = JSON.parse(e.data);
      console.log(datas);
    });
  }, []);

  function sendData(text, side, sid) {
    const sendString = {
      msg: text.trim(),
      receive_sid: sid,
      receive_side: side,
    };
    socket.send(JSON.stringify(sendString));
  }
  return (
    <>
      <div className="chattingBox">
        <div
          className="pointer"
          onClick={() => {
            setChatting(false);
          }}
        >
          X
        </div>
        <ChatContent chattingPerson={chattingPerson} />
        <input
          value={inputContent}
          onChange={(e) => {
            setInputContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputContent !== '') {
              console.log('enter');
              sendData(inputContent, side, sid);
              setInputContent('');
            }
          }}
        />
      </div>
      <div
        className="grayBack"
        onClick={() => {
          setChatting(false);
        }}
      ></div>
    </>
  );
}
export default ChattingBox;
