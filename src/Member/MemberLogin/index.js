import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import './MemberLogin.css';
const siteName = window.location.hostname;
//登入函式   傳入要登入哪個帳號  帳號 密碼

function MemberLogin() {
  const { setAuthMember } = useAuth();
  const navi = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  function login(email, password) {
    //如果其中一樣是空的
    if (!email.trim() || !password.trim()) {
      alert('輸入欄不可為空');
      return;
    } else {
      //傳送資料
      let postData = JSON.stringify({
        email: email,
        password: password,
      });

      fetch(`http://${siteName}:3001/Login/Member`, {
        method: 'POST',
        //跨域請求
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: postData,
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.success) {
            //有回傳成功則存到本機儲存空間
            localStorage.setItem('Member', res.token);
            localStorage.setItem(`MemberName`, res.name);
            navi(-1, { replace: false });
            setAuthMember(true);

            const example = localStorage.getItem('side')
            console.log(example)
            
          } else {
            alert(res.errorType);
          }
        });
    }
  }

  return (
    <div className="disf fd-c ai-c jc-c padV20">
      <h3 className="marb20">會員登入</h3>
      <div className="memberLoginForm">
        <div>
          <div>
            <input
              className="marb20"
              value={email}
              placeholder="請輸入信箱"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="marb20"
              value={password}
              placeholder="請輸入密碼"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="marb20 disf gap5">
          <button
            onClick={() => {
              login(email, password);
            }}
          >
            登入
          </button>
          <button
            onClick={() => {
              //登出直接刪除本機空間
              localStorage.removeItem('Member');
              localStorage.removeItem('MemberName');
            }}
          >
            登出
          </button>
          <button
            onClick={() => {
              setEmail('');
              setPassword('');
            }}
          >
            清空
          </button>
        </div>

        <div>
          <button
            onClick={() => {
              setEmail('test@test.com');
              setPassword('testaA123654');
            }}
          >
            會員快速登入
          </button>
        </div>
      </div>
    </div>
  );
}
export default MemberLogin;
