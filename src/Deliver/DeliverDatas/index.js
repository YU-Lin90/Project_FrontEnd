import { useState, useEffect } from 'react';
import axios from 'axios';
import History from './History';
import './history.css';

function DeliverDatas() {
  const [history, setHistory] = useState([]);

  async function getOrder() {
    const deliversid = localStorage.getItem('deliver_sid');
    // const ordersid = localStorage.getItem('order_sid');
    const reponset = await axios.get(
      `http://localhost:3005/dataslist/${deliversid}`
    );
    console.log(reponset.data);
    setHistory(reponset.data);
  }

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <ul className="Dhistoryul">
        {history.map((value, i) => {
          {
            /* const { order_sid } = value; */
          }
          return <History key={i} {...value} />;
        })}
      </ul>
    </>
  );
}
export default DeliverDatas;
