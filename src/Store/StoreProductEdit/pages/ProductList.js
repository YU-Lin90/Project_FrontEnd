import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OptionGroup from '../components/OptionGroup';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../../../Context/CartProvider';

function ProductList() {
  const { addCart } = useCart();
  const location = useLocation();
  const usp = new URLSearchParams(location.search);
  const [amount, setAmount] = useState(1);
  const [data, setData] = useState({
    shop: {},
    types: [],
    products: [],
    options_types: [],
    options: [],
  });
  const [selectedItem, setSelectedItem] = useState({
    sid: '',
    name: '',
    price: '',
    src: '',
    note: '',
    min: '',
    max: '',
    finalPrice: '',
  });
  // 傳入localStorage所需要的State
  const [details, setDetails] = useState([]);
  // 決定"放入購物車"按鈕是否啟用的State
  const [isAmountOK, setIsAmountOk] = useState(false);

  const getData = async (shop_sid) => {
    const response = await axios.get(
      `http://localhost:3001/store/?shop_sid=${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
    console.log(data.shop.sid);
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    // const myUser = JSON.parse(localStorage.getItem('StoreDatas'));
    const shop_sid = usp.get('shop_sid');
    // 取得店家菜單資料
    getData(shop_sid);
    // console.log(data);
  }, []);

  const intoCart = (e) => {
    e.preventDefault();
    // 將details修改成傳進購物車的格式
    let newDetails = [];
    details.forEach((d) => {
      newDetails = [...newDetails, ...d.list];
    });
    addCart(
      data.shop.sid,
      selectedItem.sid,
      data.shop.name,
      selectedItem.name,
      selectedItem.price,
      selectedItem.price,
      selectedItem.src,
      newDetails
    );
    console.log(
      data.shop.sid,
      selectedItem.sid,
      data.shop.name,
      selectedItem.name,
      selectedItem.price,
      selectedItem.price,
      selectedItem.src,
      newDetails
    );
  };

  return (
    <>
      <div className="product-list">
        <div className="product-container">
          <div className="row">
            <div className="shop-img">
              <img src={data.shop.src} alt="店家圖片" />
            </div>
          </div>
          <div className="row">
            <div className="shop-info">
              <div className="top-info">
                <h1>{data.shop.name}</h1>
              </div>

              <div className="bottom-info">
                <div className="rating">
                  <i className="fa-solid fa-star"></i>
                  <p>{data.shop.average_evaluation}</p>
                </div>
                <p>{data.shop.wait_time}</p>
              </div>
              <h1>{data.shop.address}</h1>
            </div>
          </div>
          <div className="row">
            <div className="product-info">
              <aside>
                <div className="type-nav">
                  <ul>
                    {data.types.map((type) => {
                      return (
                        <li>
                          <a href={`#${type.sid}`}>{type.name}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
              <main>
                {data.types.map((type) => {
                  return (
                    <>
                      <div className="product-type">
                        <h5 key={type.sid} id={type.sid}>
                          {type.name}
                        </h5>
                        <div className="product-group">
                          {data.products
                            .filter((product) => {
                              return product.products_type_sid === type.sid;
                            })
                            .map((product) => {
                              return (
                                <div className="product-box">
                                  <div
                                    className="product"
                                    onClick={() => {
                                      const newSelectedItem = {
                                        ...selectedItem,
                                      };
                                      newSelectedItem.sid = product.sid;
                                      newSelectedItem.name = product.name;
                                      newSelectedItem.price = product.price;
                                      newSelectedItem.src = product.src;
                                      newSelectedItem.note = product.note;
                                      newSelectedItem.min = product.min;
                                      newSelectedItem.max = product.max;

                                      setSelectedItem(newSelectedItem);
                                      // details
                                      const newDetails = data.options_types
                                        .filter((ot) => {
                                          return ot.product_sid === product.sid;
                                        })
                                        .map((ot) => {
                                          return {
                                            sid: ot.sid,
                                            name: ot.name,
                                            list: [],
                                          };
                                        });
                                      setDetails(newDetails);
                                    }}
                                  >
                                    <div className="left">
                                      <div className="top">
                                        <p className="product-name">
                                          {[product.name]}
                                        </p>
                                        <p className="product-note">
                                          {[product.note]}
                                        </p>
                                      </div>

                                      <p className="product-price">
                                        $ {[product.price]}
                                      </p>
                                    </div>
                                    <div className="right">
                                      <img
                                        src={`http://localhost:3001/uploads/${[
                                          product.src,
                                        ]}`}
                                        alt="商品圖片"
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </>
                  );
                })}
              </main>
            </div>
          </div>
        </div>
        <div className={`option-form ${!selectedItem.sid ? 'noDisplay' : ''}`}>
          <div className="row">
            <div className="product-img">
              <div
                className="back-btn"
                onClick={() => {
                  setSelectedItem({
                    sid: '',
                    name: '',
                    price: '',
                    src: '',
                    note: '',
                    min: '',
                    max: '',
                    finalPrice: '',
                  });
                }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              <img
                src={`http://localhost:3001/uploads/${[selectedItem.src]}`}
                alt="餐點圖片"
              />
            </div>
          </div>
          <div className="row">
            <div className="product-info">
              <div className="top">
                <h5>{selectedItem.name}</h5>
                <p>$ {selectedItem.price}</p>
              </div>
              <div className="bottom">
                <p>{selectedItem.note}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="option-section">
              <div className="option-box">
                {data.options_types
                  .filter((ot) => {
                    return ot.product_sid === selectedItem.sid;
                  })
                  .map((ot) => {
                    return (
                      <div className="option-box">
                        <div className="option-type">
                          <div className="top">
                            <h6>{ot.name}</h6>
                            <p>{!ot.min ? '' : `${ot.min}必填`}</p>
                          </div>
                          <div className="bottom">
                            <p>
                              {ot.min === 1 && ot.max === 1
                                ? '選擇1項'
                                : ot.max > 1 && ot.min > 0
                                ? `最多可選擇${ot.max}項(最少選擇${ot.min}項)`
                                : ot.max > 1 && ot.min === 0
                                ? `最多可選擇${ot.max}項(可不選擇)`
                                : null}
                            </p>
                          </div>
                        </div>
                        <div className="option-list">
                          <OptionGroup
                            ot={ot}
                            data={data}
                            details={details}
                            setDetails={setDetails}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="amount-section">
              <div className="left">
                <i
                  className={`fa-solid fa-minus ${
                    amount <= 1 ? 'inActive' : ''
                  }`}
                  onClick={() => {
                    if (amount > 1) setAmount(amount - 1);
                  }}
                ></i>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <i
                  className="fa-solid fa-plus"
                  onClick={() => {
                    if (amount > 0) setAmount(amount + 1);
                  }}
                ></i>
              </div>
              <div className="right">
                <div className="inActive" onClick={intoCart}>
                  <p>放入購物車</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
