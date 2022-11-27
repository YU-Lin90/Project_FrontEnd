//聊天內容頁 純內容
import { useEffect, useState } from 'react';
import { useFunc } from '../../../Context/FunctionProvider';

function ChatContentBox({ acceptedMessage, selectedOrder }) {
  const { loginCheckGetFetch } = useFunc();
  const [chattingDetails, setChattingDetails] = useState([]);
  const getChatHistory = async () => {
    const res = await loginCheckGetFetch(
      `MemberMapDetails/GetChattingContent?orderSid=${selectedOrder}`,
      'Member'
    );
    console.log(res);
    if (res) {
      console.log('yes');
    }
  };
  /* {
    "sid": 292,
    "post_sid": 1,
    "post_side": 1,
    "receive_sid": 1,
    "receive_side": 3,
    "post_content": "測試",
    "post_time": "11/27 10:27:09",
    "order_sid": 1
} */
  useEffect(() => {
    getChatHistory();
  }, []);
  return <>123456</>;
}
export default ChatContentBox;
