import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import InputIME from './InputIME'
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
const siteName = window.location.hostname;

export default function Search_Bar({ Search_Data }) {

  const location = useLocation();
  const usp = new URLSearchParams(location.search);

  const [users, setUsers] = useState([]);
  const [wait_Time_MIN, setwait_Time_MIN] = useState('');
  const [wait_Time_MAX, setwait_Time_MAX] = useState('');

  // 載入資料指示，true代表正在載入資料
  const [isLoading, setIsLoading] = useState(false);

  // 錯誤訊息用
  const [errorMessage, setErrorMessage] = useState('');

  const getStores = async (keyword) => {
    // 先開始載入指示器
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://${siteName}:3001/Shopping` + `?` + usp.toString()
      );
      //console.log(response)

      //設定到state裡
      setUsers(response.data);
    } catch (e) {
      // 錯誤處理
      console.error(e.message);
      setErrorMessage(e.message);
    }
  };

  const getStoresBySearchWord = async (keyword) => {
    // 先開始載入指示器
    setIsLoading(true);

    try {
      const response = await axios.get(
        'https://my-json-server.typicode.com/eyesofkids/json-fake-data/users?name_like=' +
          keyword
      );
      //設定到state裡
      setUsers(response.data);
    } catch (e) {
      // 錯誤處理
      console.error(e.message);
      setErrorMessage(e.message);
    }
  };

  // 處理過濾的函式
  const handleSearch = (keyword) => {
    // 檢查，當都沒輸入時回復原本data
    if (keyword === '') {
      getStores();
      return;
    }

    getStoresBySearchWord(keyword);
  };

  // debounce function + useCallback
  // 用途: 當不斷輸入input時，同一時間內要先停止觸發事件，直到輸入停止，400ms為等待時間
  // 使用debounce的主因，是因項目呈現、退場動畫、重新排位動畫三者均需計算與時間
  // 觸發太頻繁時，會造成動畫卡頓或卡住的現象
  const debounceHandleSearch = useCallback(_.debounce(handleSearch, 400), []);

  const handleChange = (e) => {
    // 可控元件綁用state使用
    setwait_Time_MAX(e.target.value);

    // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
    const newSearchWord = e.target.value.trim().toLowerCase();

    // 傳至debounceFn中
    debounceHandleSearch(newSearchWord);
  };

  // 延後1.5秒才關掉指示器
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading]);

  // didMount時載入資料
  useEffect(() => {
    getStores();
  }, []);

  const spinner = (
    <>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );

  const display = errorMessage ? (
    errorMessage
  ) : (
    <div className="col">
      <div className="search_bar">
        <div className="search_bar_title">
          <span>所有餐廳門市</span>
        </div>
        <div className="search_bar_box">
          <span>等待時間範圍</span>
          <span>下限</span>
          <input
            type="number"
            checked
            name="wait_Time"
            id="wait_Time_MIN"
            value="0"
            min="0"
          />
          <span>上限</span>
          <input
            type="number"
            name="wait_Time"
            id="wait_Time_MAX"
            value="0"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}
