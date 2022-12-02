import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index';
import Swal from 'sweetalert2';

function DeliverLogin() {
  const navi = useNavigate();

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
  const mySubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:3001/deliverlogin', formData)
    if(data.success){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '登入成功',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.setItem('deliver_sid', JSON.stringify(data.auth.sid));
      localStorage.setItem('deliver_name', JSON.stringify(data.auth.name));
      localStorage.setItem('onlie_state', JSON.stringify(data.success));
      localStorage.setItem('delivertake', true);
      localStorage.setItem('Deliver', data.tokenYU);
      navi('/Deliver/DeliverConfirmOrder');
      alert("登入成功");
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '登入失敗',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem('deliver_name');  //移除
      localStorage.removeItem('onlie_state');
      localStorage.removeItem('delivertake');
      localStorage.removeItem('deliver_sid');
      alert("登入失敗")
    }
  };
  /*-------------------------------------------------------------------------*/

  return (
    <>
      <p
        onClick={() => {
          setFormData({
            email: 'deliver@test.com',
            password: '123456',
            // online: 1,
          });
        }}
      >
        外送員登入
      </p>
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
