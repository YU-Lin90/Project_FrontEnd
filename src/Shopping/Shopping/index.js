import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListTable from './ListTable';
import Search_Bar from './Search_Bar';
import './Shopping.css';
const siteName = window.location.hostname;

function Shopping() {
  // const [listData, setListData] = useState({
  //   "totalRows": 0,
  //   "totalPages": 0,
  //   "perPage": 0,
  //   "page": 1,
  //   rows: []
  // });

  //表格資料
  // const [listData, setListData] = useState([]);

  //載入用，true表示正在載入中
  const [isLoading, setIsLoading] = useState(false);

  //錯誤用
  const [errorMsg, setErrorMsg] = useState('');

  //網址變動localtion
  //usp抓querystring
  // const location = useLocation();
  // const usp = new URLSearchParams(location.search);

  //抓資料
  // const getList = async (keyword) => {
  //   //先載入指示器
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `http://${siteName}:3001/Shopping` + `?` + usp.toString()
  //     );
  //     console.log(response);
  //     setListData(response.data);
  //   } catch (e) {
  //     console.log(e.message);
  //     setErrorMsg(e.message);
  //   }
  // };


  //渲染
  return (
    <>
      <div className="row">
        {/* <Search_Bar></Search_Bar> */}
          <ListTable></ListTable>
        </div>
    </>
  );
}

export default Shopping;
