import axios from 'axios';

function DeliverMessager() {
  const ordersid = localStorage.getItem('order_sid');
  async function foodget() {
    await axios.put(`http://localhost:3001/deliverorder/${ordersid}`);
  }
  async function foodreach(){
    await axios.put(`http://localhost:3001/finishdeliverorder/${ordersid}`);
  }

  return (
    <>
      <button type='button'
        onClick={()=>{
          foodget();
        }}
      >
      已取餐
      </button>
      <button type='button'
        onClick={()=>{
          foodreach();
        }}
      >
        已送達
      </button>
    </>
  );
}
export default DeliverMessager;
