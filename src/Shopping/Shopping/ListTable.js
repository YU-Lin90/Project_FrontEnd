import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ListTable() {
  const siteName = window.location.hostname;
  const location = useLocation();
  const usp = new URLSearchParams(location.search);
  const navigate = useNavigate();

  //抓網址變動
  useEffect(() => {
    submitHandle();
  }, [location]);

  //表格資料
  const [listData, setListData] = useState([]);

  const [shop, setShop] = useState([]);

  //載入用，true表示正在載入中
  const [isLoading, setIsLoading] = useState(false);
  const spinner = (
    <>
      <div className="spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );

  //連結，暫時無用
  const handleClick = (myLink) => () => {
    // navigate = '/';
  };

  //錯誤用
  const [errorMsg, setErrorMsg] = useState('');

  //儲存搜尋值的value用
  const [searchWord, setSearchWord] = useState('');
  const [searchPriceMax, setSearchPriceMax] = useState('');
  const [searchPriceMin, setSearchPriceMin] = useState('');
  const [searchWaitTime, setSearchWaitTime] = useState('');

  //如果還沒有搜尋過，讓預計配送時間在第一次render即預設120分鐘
  // useEffect(() => {
  //   if (!usp.toString()) {
  //     setSearchWaitTime(120);
  //   }
  // }, []);

  //儲存搜尋時呈現的結果用
  const [noResult, setNoResult] = useState('正在搜尋中');

  // const [searchData, setSearchData] = useState({
  //   price_min: '',
  //   price_max: '',
  // });

  // const price_maxHandle = (key, value) => {
  //   this.setSearchData({ price_max: value.key });
  // };

  // const price_minHandle = (key, value) => {
  //   this.setSearchData({ price_min: value.key });
  // };

  // const getListBySearchWord = async (keyword) => {
  //先載入指示器
  // setIsLoading(true);
  // `http://${siteName}:3001/Shopping` + `?` + usp.toString()

  // try {
  // const response =  axios.get(
  //   `http://${siteName}:3001/Shopping`
  //   );
  //   setListData(response.data);
  //   } catch (e) {
  //     setErrorMsg(e.message);
  // }
  // };

  // `http://${siteName}:3001/Shopping` + `?` + usp.toString()

  //取得所有店家
  const getShop = async () => {
    try {
      let result = await axios.get(`http://${siteName}:3001/Shopping`);

      // TODO:要把sendaddress比對商店的address後，算出現在位置和店家之間的距離
      // 每5公里加10元外送費
      // for in (sendaddress <=> shop.address)
      // (distance in result.data)
      
      setShop(result.data);
    } catch (e) {
      setErrorMsg(e.message);
    }
    console.log(errorMsg);
  };

  const handleChange = (event) => {
    let value = event.target.value
    setSearchWaitTime(value);
  };

  //不送出就搜尋(暫時無用)
  const searchHandle = async (event) => {
    let key = event.target.value;

    let result = await axios.get(
      `http://${siteName}:3001/Shopping/?search=${key}`
    );

    if (result) {
      console.log(result);
      setShop(result.data);
      console.log(
        '網址列搜尋字串:',
        usp.get('search'),
        '價格上限:',
        // usp.get('price_max'),
        usp.get('price_max'),
        '價格下限:',
        usp.get('price_min')
      );
    }
  };

  //送出後再統一做搜尋
  const submitHandle = async (event) => {
    let key = usp.get('search');
    let price_max = usp.get('price_max');
    let price_min = usp.get('price_min');
    let wait_time = usp.get('wait_time');

    if (wait_time && wait_time < 5) {
      wait_time = 5;
    }

    setSearchWord(key);
    setSearchPriceMax(price_max);
    setSearchPriceMin(price_min);
    setSearchWaitTime(wait_time);

    let result = await axios.get(
      `http://${siteName}:3001/Shopping/?search=${key}&price_max=${price_max}&price_min=${price_min}&wait_time=${wait_time}`
      // `http://${siteName}:3001/Shopping/` + `?` + usp.toString()
    );

    console.log(
      'key:',
      key,
      '結果網址',
      `http://${siteName}:3001/Shopping/` + `?` + usp.toString()
    );
    //搜尋後結果存入shop
    setShop(result.data);

    //如果沒有結果則NoResult從"正在搜尋中"更改為"沒有找到"
    if (!shop.length) {
      setNoResult('無法找到您想要的餐點');
    } else {
      setNoResult('');
    }

    console.log(
      'submit後搜尋字串:',
      usp.get('search'),
      '價格上限:',
      usp.get('price_max'),
      '價格下限:',
      usp.get('price_min'),
      '等待時間:',
      usp.get('wait_time')
    );

    console.log('usp:', usp.toString());

    //如果什麼都沒輸入 找全店家列表
    if (
      !usp.get('search') &&
      !usp.get('price_max') &&
      !usp.get('price_min') &&
      !usp.get('wait_time')
    ) {
      getShop();
    }
  };

  return (
    <>
      <div className="col_bar">
        <form className="table">
          <div className="search_bar">
            <div className="search_bar_title">
              <span>搜尋店家及餐點</span>
            </div>
            <div className="search_bar_box">
              {/* Link時 querystring資料要換成店家的querystring("sid" "name"之類的) */}
              <div className="search_bar_name">
                <input
                  type="text"
                  //req.query.search
                  //:3001/Shopping/?search=
                  name="search"
                  className="search_bar_name_input"
                  placeholder="以店名及餐點搜尋"
                  // onChange={searchHandle}
                  defaultValue={searchWord}
                  autoFocus
                />
              </div>
              <div className="search_bar_price">
                <span>價格搜尋</span>
                <span>最高</span>
                <input
                  type="number"
                  name="price_max"
                  className="search_bar_price_max_input"
                  min="0"
                  defaultValue={searchPriceMax || ""}
                />
                <span>最低</span>
                <input
                  type="number"
                  name="price_min"
                  className="search_bar_price_min_input"
                  min="0"
                  defaultValue={searchPriceMin || ""}
                />
              </div>
              <div className="search_bar_point">
                <span>評價搜尋</span>
                <span>僅包含</span>
                <input type="checkbox" name="" />
                1星
                <input type="checkbox" />
                2星
                <input type="checkbox" />
                3星
                <input type="checkbox" />
                4星
                <input type="checkbox" />
                5星
              </div>
              <div className="search_bar_time">
                <span>預計配送時間(最低5分鐘)</span>
                <div className='range_label'>
                  <span>最長</span>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    onChange={handleChange}
                    disabled
                    value={searchWaitTime || 120}
                  />
                  <span>分鐘</span>
                </div>
                <div className="range">
                  <input
                    className="slider"
                    type="range"
                    name="wait_time"
                    id="wait_time"
                    min="0"
                    max="120"
                    step="5"
                    value={searchWaitTime || 120}
                    onChange={handleChange}
                    list="steplist"
                  />
                  <div className="sliderticks">
                    <p>5</p>
                    <p>30</p>
                    <p>60</p>
                    <p>90</p>
                    <p>120</p>
                  </div>
                </div>
              </div>
            </div>
            <input type="submit" value="開始搜尋" />
          </div>
        </form>
      </div>

      <div className="col_list">
        <div className="subTitle">
          <h2>所有餐廳</h2>
        </div>
        <div className="shopCardList">
          {shop.length > 0 ? (
            shop.map((shop, index) => (
              <div key={index} className="shopCardBox">
                <div className="shopCard_image">
                  <div className="shopCard_conpon"></div>
                  <div className="shopCard_delivery_time">
                    等待時間{shop.wait_time}
                  </div>
                </div>
                <div className="shopCard_text" onClick={handleClick}>
                  <div className="shopCard_text_name">
                    {/* {submitHandle && <span>{shop.products_name}</span>} */}
                    <span>{shop.name}</span>
                    <div className="shopCard_score">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 40 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 0L24.4903 13.8197H39.0211L27.2654 22.3607L31.7557 36.1803L20 27.6393L8.2443 36.1803L12.7346 22.3607L0.97887 13.8197H15.5097L20 0Z"
                          fill="#FFA500"
                        />
                      </svg>
                      {/* 資料庫結構: 小數點 */}
                      {shop.average_evaluation}
                    </div>

                    {/* TODO 距離 */}
                  </div>
                  {/* <span>{shop.price ? `\$ ${shop.price} 元` : ""}</span> */}
                  <span>{shop.food_type_sid}</span>
                  <span>{shop.phone}</span>
                </div>
              </div>
            ))
          ) : (
            <div>{noResult}</div>
          )}

        </div>
      </div>
    </>
  );
}
