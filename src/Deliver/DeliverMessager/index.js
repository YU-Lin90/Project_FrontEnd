import axios from 'axios';

function DeliverMessager() {
  const ordersid = localStorage.getItem('order_sid');
  async function foodget() {
    const respon = await axios.put(
      `http://localhost:3005/deliverorder/${ordersid}`
    );
  }

  return (
    <>
      <button type='button'
        onClick={()=>{
          foodget()
        }}
      >
      已取餐
      </button>
    </>
  );
}
export default DeliverMessager;
