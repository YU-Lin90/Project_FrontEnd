//WS第五層 只有詳細對話內容
import { useEffect } from 'react';
const siteName = window.location.hostname;
const tokenString = localStorage.getItem('Admin');

function ChatContent({ chattingPerson }) {
  const { sid, side } = chattingPerson;
  const postData = JSON.stringify({ getSid: sid, getSide: side });

  function getChatDetail() {
    fetch(`http://${siteName}:3001/AdminService/Choosed`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenString,
      },
      body: postData,
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        //   console.log(res);
      });
  }

  useEffect(() => {
    getChatDetail();
  }, []);

  return (
    <>
      <div>對話內容</div>
    </>
  );
}
export default ChatContent;
