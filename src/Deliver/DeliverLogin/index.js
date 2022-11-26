import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index'

function DeliverLogin() {
  const navi = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // online: 1,
  });

  /*---------笨的方法是e.target.value(這是用陣列物件的key:value導出值)-------------*/
  const handler = (e) => {
    const id = e.currentTarget.id;
    const val = e.currentTarget.value;
    setFormData({ ...formData, [id]: val });
  };
  /*-------------------------------------------------------------------------*/
  /*--------------發送axios出去成功(formData可以成為json格式輸出)----------------*/
  const mySubmit = async (e) =>{
    e.preventDefault();
    const { data } = await axios.post('http://localhost:3005/deliverlogin', formData)
    if(data.success){
      localStorage.setItem('deliver_sid', JSON.stringify(data.auth.sid));
      localStorage.setItem('deliver_name', JSON.stringify(data.auth.name));
      localStorage.setItem('onlie_state', JSON.stringify(data.success));
      navi('/Deliver/DeliverConfirmOrder');
      alert("登入成功");
    }else{
      localStorage.removeItem('deliver_name');  //移除
      localStorage.removeItem('onlie_state');
      alert("登入失敗")
    }
  }
  /*-------------------------------------------------------------------------*/

  return (
    <>
      外送員登入頁
      <form onSubmit={mySubmit}>
        <label htmlFor="email">帳號</label>
        <input
          type="text"
          value={formData.email}
          id="email"
          onChange={handler}
        />

        <label htmlFor="password">密碼</label>
        <input
          type="password"
          value={formData.password}
          id="password"
          onChange={handler}
        />
        {/* <input
          className='hiedn'
          type="text"
          value={formData.online}
          id="online"
          onChange={handler}
        /> */}

        <input type="submit" value="登入" />
      </form>
    </>
  );
}

export default DeliverLogin;
