import { useState, useEffect, Component } from 'react';
import BarChart from './BarChart';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function StoreSellAnalyze() {
  const siteName = window.location.hostname;
  const [shopData, setShopData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const getShop = async () => {
    const result = await axios.get(`http://${siteName}:3001/StoreSellAnalyze`);
    // const sid = result.data.map((data) => data.sid);
    // console.log(sid);
    console.log(result.data);
    setShopData(result.data.map((data) => data.sid));
    setSalesData(result.data.map((data) => data.order_total));
  };

  useEffect(() => {
    getShop();
  }, []);

  const data = {
    //X軸(變量)
    labels: shopData,
    datasets: [
      {
        label: '已完成訂單銷售額',
        //Y軸(數據)
        data: salesData,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div>
        <Line data={data} />
      </div>
    </>
  );
}
export default StoreSellAnalyze;
