import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Btn(props){
    const navi = useNavigate();

    const mySubmit = async () => {
    const formData = {email: props.account, password: props.password}
  
  
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
    }
  };
  return(
    <button
        className="m_login_button"
        onClick={() => {
          if(props.kind=="Deliver"){
            mySubmit()
          }
        }}
    >
        登入
    </button>
  )
}
