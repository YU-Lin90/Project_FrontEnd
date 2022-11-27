//聊天框
import { useState } from 'react';
import ChatContentBox from './ChatContentBox';
function OrderChattingBox({ setOpenChat, acceptedMessage, selectedOrder }) {
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <div className="orderOnMapChattingBox">
        <div className="disf fd-cr h100p">
          {/* input */}
          <div className="h10p disf jc-se ai-c po-r ">
            <p
              className="pointer"
              onClick={() => {
                setOpenChat(false);
              }}
            >
              X
            </p>
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button>send</button>
          </div>
          {/* 內容 */}
          <div className="orderOnMapChattingBoxContent">
            <ChatContentBox
              acceptedMessage={acceptedMessage}
              selectedOrder={selectedOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderChattingBox;
