import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import './MemberLogin.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
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
      Swal.fire('輸入欄不可為空');
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
            localStorage.setItem('MemberSid', res.sid);
            navi(-1, { replace: false });
            setAuthMember(true);
            Swal.fire({
              icon: 'success',
              title: '登入成功',
            });
          } else {
            Swal.fire(res.errorType);
          }
        });
    }
  }

  return (
    <div className="disf fd-c ai-c jc-c padV20">
      <div className="memberLoginForm">
        <div className="m_box">
          <h3
            className="mar"
            onClick={() => {
              setEmail('abc1234000@gmail.com');
              setPassword('Aa123456781');
            }}
          >
            會員登入
          </h3>
          <div>
            <label className='m_login_label'>帳號</label>
            <br />
            <input
              className="m_login_email"
              value={email}
              placeholder="請輸入信箱"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <label className='m_login_label'>密碼</label>
            <br />
            <input
              className="m_login_password"
              value={password}
              placeholder="請輸入密碼"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="m_login_button"
              onClick={() => {
                login(email, password);
              }}
            >
              登入
            </button>
            {/* <button
            onClick={() => {
              //登出直接刪除本機空間
              localStorage.removeItem('MemberSid');
              localStorage.removeItem('Member');
              localStorage.removeItem('MemberName');
            }}
          >
            登出
          </button> */}
            {/* <button
            onClick={() => {
              setEmail('');
              setPassword('');
            }}
          >
            清空
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MemberLogin;
