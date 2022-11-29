import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function ListTable() {
  const siteName = window.location.hostname;
  const location = useLocation();
  const usp = new URLSearchParams(location.search);
  const [user, setUser] = useState([]);
  const [myIndex, setMyIndex] = useState({});
  const [index, setIndex] = useState();

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
  const [searchWaitTime, setSearchWaitTime] = useState('60');

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
    const sid = localStorage.getItem('MemberSid');
    try {
      const response = await axios.get(`http://${siteName}:3001/Shopping`);
      // setShop(result.data);
      try {
        const response_favorite = await axios.get(
          `http://localhost:3001/MemberLogin/api3/${sid}` //最愛店家
        );

        console.log(response_favorite.data);
        setUser(response_favorite.data);
        // const arr = { ...response_favorite.data };
        const obj = {};
        response_favorite.data.forEach((el) => {
          obj[el.shop_sid] = true;
        });
        console.log(obj);
        //myIndex, setMyIndex
        let newIndex = { ...myIndex };
        response.data.forEach((element) => {
          if (obj[element.sid]) {
            newIndex = { ...newIndex, [element.sid]: true };
            element.favor = true;
            return;
          }
          newIndex = { ...newIndex, [element.sid]: false };
          element.favor = false;
        });
        setMyIndex(newIndex);
        setShop(response.data);
        console.log(response.data);
      } catch (e) {
        console.error(e.message);
        return e.message;
      }
    } catch (e) {
      setErrorMsg(e.message);
    }
    // console.log(errorMsg);
  };

  const add = async (shopSid) => {
    const sid = localStorage.getItem('MemberSid');
    // const fd = new FormData({ input });

    try {
      const response = await axios.post(
        `http://localhost:3001/MemberLogin/addshop/${sid}/${shopSid}`
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  const del = async (shopSid) => {
    const sid = localStorage.getItem('MemberSid');

    try {
      const response = await axios.delete(
        `http://localhost:3001/MemberLogin/del/${sid}/${shopSid}`
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getShop();
  }, []);

  const submit = async (shopSid) => {
    // e.preventDefault();
    // const fd = new FormData({ input });
    // console.log(fd);
    // const nextStatusIndex = myIndex[shopSid] === 0 ? 1 : 0;
    const nextIndex = !myIndex[shopSid] ? add(shopSid) : del(shopSid);
    // setMyIndex(nextStatusIndex);
    setIndex(nextIndex);
  };

  const handleChange = (event) => {
    let searchWaitTime_value = event.target.value;
    setSearchWaitTime(searchWaitTime_value);
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

    setSearchWord(key);
    setSearchPriceMax(price_max);
    setSearchPriceMin(price_min);
    setSearchWaitTime(wait_time);

    let result = await axios.get(
      `http://${siteName}:3001/Shopping/?search=${key}&price_max=${price_max}&price_min=${price_min}`
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
      'shop:',
      shop.length,
      'usp:',
      usp.toString()
    );

    //如果什麼都沒輸入 找全店家列表
    if (!usp.get('search') && !usp.get('price_max') && !usp.get('price_min')) {
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
                  placeholder="以店名及商品名搜尋"
                  // onChange={searchHandle}
                  defaultValue={searchWord}
                />
              </div>
              <div className="search_bar_price">
                <span>價格搜尋</span>
                <span>最高</span>
                <input
                  type="number"
                  name="price_max"
                  className="search_bar_price_max_input"
                  defaultValue={searchPriceMax}
                />
                <span>最低</span>
                <input
                  type="number"
                  name="price_min"
                  className="search_bar_price_min_input"
                  min="0"
                  defaultValue={searchPriceMin}
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
                <span>預計配送時間</span>
                <span>最長{searchWaitTime}分鐘</span>
                <input
                  type="range"
                  name="wait_time"
                  id="wait_time"
                  min="0"
                  max="120"
                  step="5"
                  value={searchWaitTime}
                  onChange={handleChange}
                />
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
                    等待時間{shop.delivery_time}
                  </div>
                </div>
                <div className="shopCard_text" onClick={handleClick}>
                  <div className="shopCard_text_name">
                    {submitHandle && <span>{shop.products_name}</span>}
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
                      {shop.evaluation_score}
                    </div>

                    {/* TODO 距離 */}
                  </div>

                  <span>${shop.price}元</span>
                  <span>{shop.food_type_sid}</span>
                  <span>{shop.phone}</span>

                  <button
                    onClick={() => {
                      submit(shop.sid);
                      const oldState = myIndex[shop.sid];
                      setMyIndex({ ...myIndex, [shop.sid]: !oldState });
                    }}
                    // className="icon"
                  >
                    {!myIndex[shop.sid] ? <AiOutlineHeart /> : <AiFillHeart />}
                  </button>
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
