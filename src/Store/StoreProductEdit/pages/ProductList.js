import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import OptionForm from '../components/OptionForm/index';

function ProductList() {
  const siteName = window.location.hostname;

  const location = useLocation();
  const usp = new URLSearchParams(location.search);
  const [data, setData] = useState({
    shop: {},
    types: [],
    products: [],
    options_types: [],
    options: [],
  });
  // selectedSid
  const [selectedSid, setSelectedSid] = useState('');

  const getData = async (shop_sid) => {
    const response = await axios.get(
      `http://${siteName}:3001/store/?shop_sid=${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    // const myUser = JSON.parse(localStorage.getItem('StoreDatas'));
    const shop_sid = usp.get('shop_sid');
    // 取得店家菜單資料
    getData(shop_sid);
    // console.log(data);
  }, []);

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
              <div className="top">
                <h1>{data.shop.name}</h1>
              </div>

              <div className="bottom">
                <div className="rating">
                  <i className="fa-solid fa-star"></i>
                  <p>{data.shop.average_evaluation}</p>
                </div>
                <p>等待時間 : {data.shop.wait_time}</p>
                <p>點選即可查看營業時間、資訊和更多內容</p>
              </div>
              {/* <h1>{data.shop.address}</h1> */}
            </div>
          </div>
          <div className="row">
            <div className="product-info">
              <aside>
                <div className="type-nav">
                  <ul>
                    {data.types.length !== 0 ? (
                      data.types.map((type) => {
                        return (
                          <li
                            className={
                              !data.products.find((p) => {
                                return type.sid === p.products_type_sid;
                              })
                                ? 'noDisplay'
                                : ''
                            }
                          >
                            <a href={`#${type.sid}`}>{type.name}</a>
                          </li>
                        );
                      })
                    ) : (
                      <>
                        <li>
                          <a href="#">全部商品</a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </aside>
              <main>
                {data.types.length === 0 ? (
                  <>
                    {/* <h3>123</h3> */}
                    <div className="product-type">
                      <div className="product-group">
                        {data.products.map((product) => {
                          return (
                            <div className="product-box">
                              <div
                                className="product"
                                onClick={() => {
                                  // selectedSid
                                  setSelectedSid(product.sid);
                                }}
                              >
                                <div className="left">
                                  <p className="product-name">
                                    {[product.name]}
                                  </p>
                                  <p className="product-note">
                                    {[product.note]}
                                  </p>

                                  <p className="product-price">
                                    $ {[product.price]}
                                  </p>
                                </div>
                                <div className="right">
                                  <img
                                    src={`http://${siteName}:3001/uploads/${[
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
                ) : (
                  data.types.map((type) => {
                    return (
                      <>
                        <div
                          className={`product-type ${
                            !data.products.find(
                              (product) =>
                                product.products_type_sid === type.sid
                            )
                              ? 'noDisplay'
                              : ''
                          }
                        `}
                        >
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
                                        // selectedSid
                                        setSelectedSid(product.sid);
                                      }}
                                    >
                                      <div className="left">
                                        <p className="product-name">
                                          {[product.name]}
                                        </p>
                                        <p className="product-note">
                                          {[product.note]}
                                        </p>

                                        <p className="product-price">
                                          $ {[product.price]}
                                        </p>
                                      </div>
                                      <div className="right">
                                        <img
                                          src={`http://${siteName}:3001/uploads/${[
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
                  })
                )}
              </main>
            </div>
          </div>
        </div>
        {selectedSid ? (
          <>
            <OptionForm
              selectedSid={selectedSid}
              setSelectedSid={setSelectedSid}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ProductList;
