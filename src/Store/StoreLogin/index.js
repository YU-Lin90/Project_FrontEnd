import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import './StoreLogin.css';
const siteName = window.location.hostname;
//登入函式   傳入要登入哪個帳號  帳號 密碼

function StoreLogin() {
  const { setAuthStore, setAuthAdmin } = useAuth();
  const navi = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

      fetch(`http://${siteName}:3001/Login/Store`, {
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
            localStorage.setItem('Store', res.token);
            localStorage.setItem(`StoreName`, res.name);
            if (res.adminToken) {
              //登入管理者導向不同
              localStorage.setItem('Admin', res.adminToken);
              localStorage.setItem(`AdminName`, '管理者');
              setAuthStore(true);
              setAuthAdmin(true);
              navi('/Admin');
              return;
            }
            navi(-1, { replace: true });
            setAuthStore(true);
          } else {
            alert(res.errorType);
          }
        });
    }
  }

  return (
    <div className="disf ai-c jc-c padV20">
      <div className="storeLoginForm">
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
              localStorage.removeItem('Store');
              localStorage.removeItem('StoreName');
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
              setEmail('S89account');
              setPassword('S89password');
            }}
          >
            店家快速登入
          </button>
          <button
            onClick={() => {
              setEmail('admin@test.com');
              setPassword('test');
            }}
          >
            管理者快速登入
          </button>
        </div>
      </div>
    </div>
  );
}
export default StoreLogin;
