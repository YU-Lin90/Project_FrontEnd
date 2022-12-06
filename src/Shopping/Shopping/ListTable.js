import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';

//距離用----------------------------------------------------------------
import { useGeo } from '../../Context/GeoLocationProvider';
//地址用----------------------------------------------------------------
import { usePay } from '../../Context/PayPageContext';

export default function ListTable() {
  const siteName = window.location.hostname;
  const location = useLocation();
  const usp = new URLSearchParams(location.search);

  const [user, setUser] = useState([]);
  const [myIndex, setMyIndex] = useState({});
  const [index, setIndex] = useState();

  //儲存搜尋時呈現的訊息用
  const [noResult, setNoResult] = useState('正在搜尋中');
  //檢查是否為城市頁
  const [isCity, setIsCity] = useState(false);
  const pathname = window.location.pathname;

  const navigate = useNavigate();

  const [isFake, setIsFake] = useState(0);

  //-------------------------計算距離用------------------------------------

  //距離用
  const { calculateDistance } = useGeo();
  //地址用
  const { sendAddress, setSendAddress } = usePay();

  //----------------------------------------------------------------------

  //抓網址變動
  useEffect(() => {
    setNoResult('正在搜尋中');
    submitHandle();
  }, [sendAddress, isFake]);

  //表格資料
  const [shop, setShop] = useState([]);

  //checkbox用
  const [isChecked, setIsChecked] = useState(true);

  //錯誤用
  const [errorMsg, setErrorMsg] = useState('');

  //儲存搜尋值的value用
  const [searchWord, setSearchWord] = useState('');
  const [searchPriceMax, setSearchPriceMax] = useState('');
  const [searchPriceMin, setSearchPriceMin] = useState('');
  const [searchWaitTime, setSearchWaitTime] = useState('');
  const [searchTotalRows, setSearchTotalRows] = useState('');

  //取得所有店家
  const getShop = async () => {
    const sid = localStorage.getItem('MemberSid');

    console.log('path', pathname);

    let order = usp.get('order');

    try {
      const response = await axios.get(`http://${siteName}:3001/Shopping`);

      //把總筆數和checkbox回歸初始狀態
      setSearchTotalRows('');
      setIsChecked(true);
      // 如果排序=距離，把資料按distance由小到大排列
      if (order === 'distance') {
        response.data.sort((a, b) => a.distance - b.distance);
      }
      //---------------------------計算距離用-----------------------------
      if (sendAddress) {
        for (let element of response.data) {
          const shopAddress = element.address;
          const selfLocation = sendAddress;

          setNoResult('正在搜尋中');
          // 計算("店家地址","送達地址")間的直線距離
          const gettedDistance = await calculateDistance(
            shopAddress,
            selfLocation
          );

          // 測試用，隨機亂數資料
          // const gettedDistance = Math.random() * 50;

          // 將結果放進result.distance
          element.distance = Math.round(gettedDistance * 10) / 10;
          // 超過30公里，每5公里加10元外送費
          element.fees = parseInt(gettedDistance / 5) * 10 + 30;
        }
      }
      //-----------------------------------------------------------------

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

  const submit = async (shopSid) => {
    const sid = localStorage.getItem('MemberSid');

    if (!sid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入會員',
      });
      navigate('/MemberLogin');
    } else {
      // e.preventDefault();
      // const fd = new FormData({ input });
      // console.log(fd);
      // const nextStatusIndex = myIndex[shopSid] === 0 ? 1 : 0;
      const nextIndex = !myIndex[shopSid] ? add(shopSid) : del(shopSid);
      // setMyIndex(nextStatusIndex);
      setIndex(nextIndex);
    }
  };

  // 等待時間的改變事件
  const word_handleChange = (event) => {
    let value = event.target.value;
    setSearchWord(value);
  };
  // 等待時間的改變事件
  const waitTime_handleChange = (event) => {
    let value = event.target.value;
    setSearchWaitTime(value);
  };
  // checkedBox的改變事件
  const checkedBox_handleChange = (event) => {
    if (event.target.checked) {
      setIsChecked(!isChecked);
    }
  };
  const [formData, setFormData] = useState({});

  const form_handleChange = (e) => {
    const dataIN = { ...formData, [e.target.name]: e.target.value };
    setFormData(dataIN);
  };

  //送出後再統一做搜尋
  const submitHandle = async (event) => {
    const sid = localStorage.getItem('MemberSid');
    let key = formData.search;
    let price_max = formData.price_max;
    let price_min = formData.price_min;
    let wait_time = searchWaitTime;
    let order = isChecked;
    console.log("form",formData)

    // console.log('排序:', order);

    // 如果等待時間小於5，設置成5
    if (wait_time && wait_time < 5) {
      wait_time = 5;
    }

    // 如果排序選擇距離則設置固定在距離
    if (order && order === 'distance') {
      setIsChecked(!isChecked);
    }

    setSearchWord(key);
    setSearchPriceMax(price_max);
    setSearchPriceMin(price_min);
    setSearchWaitTime(wait_time);

    // 取地址
    // console.log("指定地址",sendAddress)

    // 用空格("\s")同時搜尋多個字段，以","("%2C")取代
    if (key) {
      key = key.trim().replace(/\s+/g, '%2C');
    }

    let result = await axios.get(
      `http://${siteName}:3001/Shopping/?search=${key}&price_max=${price_max}&price_min=${price_min}&order=${order}&wait_time=${wait_time}`
      // `http://${siteName}:3001/Shopping/` + `?` + usp.toString()
    );
    setShop(result.data);

    //---------------------------計算距離用-----------------------------

    if (sendAddress) {
      for (let element of result.data) {
        const shopAddress = element.address;
        const selfLocation = sendAddress;

        // 計算("店家地址","送達地址")間的直線距離
        const gettedDistance = await calculateDistance(
          shopAddress,
          selfLocation
        );

        // 測試用，隨機亂數
        // const gettedDistance = Math.random() * 50;

        // 將結果放進result.distance
        element.distance = Math.round(gettedDistance * 10) / 10;
        // 超過30公里，每5公里加10元外送費
        element.fees = parseInt(gettedDistance / 5) * 10 + 30;

        // 如果排序=距離，把資料按distance由小到大排列
        if (order === 'distance') {
          result.data.sort((a, b) => a.distance - b.distance);
        }
      }
    }
    //-----------------------------------------------------------------

    console.log(
      'key:',
      key,
      '結果網址',
      `http://${siteName}:3001/Shopping/` + `?` + usp.toString()
    );
    //搜尋後結果存入shop
    //setShop(result.data);

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
      result.data.forEach((element) => {
        if (obj[element.sid]) {
          newIndex = { ...newIndex, [element.sid]: true };
          element.favor = true;
          return;
        }
        newIndex = { ...newIndex, [element.sid]: false };
        element.favor = false;
      });
      setMyIndex(newIndex);
      setShop(result.data);
      console.log(result.data);
    } catch (e) {
      console.error(e.message);
      return e.message;
    }

    // //搜尋後結果存入shop
    // setShop(result.data);

    // 如果沒有結果則NoResult從"正在搜尋中"更改為"沒有找到"
    if (!shop.length) {
      setNoResult('無法找到您想要的餐點');
    } else {
      setNoResult('');
    }

    //有搜尋店名or價格上限or下限才顯示筆數(等待時間沒有)
    if (key || price_max || price_min) {
      if (result.data.length > 0) {
        setSearchTotalRows(result.data[0].total_rows);
      }
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
    // if (
    //   !usp.get('search') &&
    //   !usp.get('price_max') &&
    //   !usp.get('price_min') &&
    //   !usp.get('wait_time') &&
    //   !usp.get('order')
    // ) {
    //   getShop();
    // }
  };

  const [toggle, setToggle] = useState(true);

  function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth]);
    useEffect(() => {
      const handleResize = () => {
        setSize([window.innerWidth]);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return size;
  }

  //const [width] = useWindowSize();

  // useEffect(() => {
  //   width < 768 && style();
  // }, [width]);

  const [isDisplay, setIsDisplay] = useState(false);
  const switchDisplay = () => {
    setIsDisplay(!isDisplay);
  };

  const style = {
    '@media(maxWidth:768px)': {
      padding: '800px',
    },
  };

  return (
    <>
      {/* {toggle ? ( */}
      <div className="col_bar" style={style}>
        <form
          className="table"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="search_bar">
            {searchTotalRows ? (
              <>
                {searchWord && searchWord.length > 0 ? (
                  <p>{searchWord}的搜尋結果</p>
                ) : (
                  ''
                )}
                <p>{searchTotalRows}個店家</p>
              </>
            ) : (
              <p>所有餐廳</p>
            )}
            <div className="search_bar_title">
              <p>搜尋店家及餐點</p>
            </div>
            <div className="search_bar_box">
              <div className="search_bar_name">
                <input
                  type="text"
                  name="search"
                  className="search_bar_name_input"
                  placeholder="以店名或餐點名搜尋"
                  // onChange={searchHandle}
                  defaultValue={searchWord}
                  autoFocus
                  value={formData.search}
                  onChange={(e) => {
                    form_handleChange(e);
                  }}
                />
              </div>
              <div className="search_bar_price">
                <p>以價格搜尋</p>
                <div className="search_bar_price_max">
                  <span>最高</span>
                  <input
                    type="number"
                    name="price_max"
                    className="search_bar_price_max_input"
                    min="0"
                    defaultValue={searchPriceMax || ''}
                    value={formData.price_max}
                    onChange={(e) => {
                      form_handleChange(e);
                    }}
                  />
                </div>
                <div className="search_bar_price_min">
                  <span>最低</span>
                  <input
                    type="number"
                    name="price_min"
                    className="search_bar_price_min_input"
                    min="0"
                    defaultValue={searchPriceMin || ''}
                    value={formData.price_min}
                    onChange={(e) => {
                      form_handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="search_bar_tag">
                <p>分類排序</p>
                <div className="search_bar_point_button">
                  <div className="search_bar_point_button1">
                    <input
                      type="checkbox"
                      id="checkbox_point"
                      name="order"
                      value="point"
                      checked={isChecked}
                      onChange={checkedBox_handleChange}
                    />
                    <label htmlFor="checkbox_point">評分</label>
                  </div>
                  <div className="search_bar_point_button2">
                    <input
                      type="checkbox"
                      id="checkbox_distance"
                      name="order"
                      value="distance"
                      checked={!isChecked}
                      onChange={checkedBox_handleChange}
                    />
                    <label htmlFor="checkbox_distance">距離</label>
                  </div>
                </div>
              </div>
              <div className="search_bar_time">
                <p>餐點完成時間</p>
                <div className="range_label">
                  <span>最長</span>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    onChange={waitTime_handleChange}
                    disabled
                    value={searchWaitTime || 120}
                  />
                  <span>分鐘(最短5分鐘)</span>
                </div>
                <div className="range">
                  <input
                    className="slider"
                    type="range"
                    name="wait_time"
                    id="wait_time"
                    min="0"
                    max="80"
                    step="5"
                    value={searchWaitTime || 120}
                    onChange={waitTime_handleChange}
                    list="steplist"
                  />
                  <div className="sliderticks">
                    <p>5</p>
                    <p>20</p>
                    <p>40</p>
                    <p>60</p>
                    <p>80</p>
                  </div>
                </div>
              </div>
            </div>
            <input
              onClick={() => {
                submitHandle();
              }}
              type="submit"
              value="開始搜尋"
              className="search_bar_submit"
            />
          </div>
        </form>
      </div>
      {/* ) : ( */}
      {/* '' */}
      {/* )} */}

      <div className="col_list">
        <div className="subTitle">所有餐廳</div>
        <div className="shopCardList">
          {shop.length > 0 ? (
            shop.map((shop, index) => (
              <div key={index} className="shopCardBox">
                <Link to={'/productList/?shop_sid=' + shop.sid}>
                  <div className="shopCard_image">
                    <img
                      src={`http://${siteName}:3001/images/shop/storeCover1.webp`}
                      alt={shop.name}
                      className="shopCard_cover"
                    />
                    <div className="shopCard_conpon">aaaaaaa</div>
                    <div className="shopCard_delivery_time">
                      {shop.wait_time}
                      <div className="shopCard_delivery_time_text">分鐘</div>
                    </div>
                    <button
                      className="shopbtn"
                      onClick={(e) => {
                        e.preventDefault();
                        submit(shop.sid);
                        const oldState = myIndex[shop.sid];
                        setMyIndex({ ...myIndex, [shop.sid]: !oldState });
                      }}
                      // className="icon"
                    >
                      {!myIndex[shop.sid] ? (
                        <AiOutlineHeart />
                      ) : (
                        <AiFillHeart />
                      )}
                    </button>
                  </div>
                  {/* <span>SID {shop.sid}</span> */}
                  <div className="shopCard_text">
                    <div className="shopCard_text_name">
                      <h3 className="shoptitle">{shop.name}</h3>
                      <div className="shopCard_score">
                        {shop.average_evaluation !== null ? (
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
                        ) : (
                          ''
                        )}
                        {/* 資料庫結構: 小數點 */}
                        <p>{shop.average_evaluation}</p>
                      </div>
                    </div>
                    <span className="shopcontext">
                      {shop.distance} km,{shop.type_name}
                    </span>
                    {/* <span>{shop.distance} 公里</span> */}
                    <span className="shopcontext">外送費{shop.fees}元</span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>{noResult}</div>
          )}
        </div>
      </div>
      <div
        onClick={() => {
          setToggle(!toggle);
          console.log(toggle);
        }}
        className="search_bar_toggle"
        id="bar_switch"
      ></div>
    </>
  );
}

//TODO: sidebar 在正常下display flex RWD下display none
//TODO: toggle 在正常下display none RWD下display flex
//TODO: toggle 可以切換sidebar的display flex
