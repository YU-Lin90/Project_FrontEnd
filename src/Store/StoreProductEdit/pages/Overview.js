import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OptionGroup from '../components/OptionForm/OptionGroup';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

function Overview() {
  const [amount, setAmount] = useState(1);
  const [data, setData] = useState({
    types: [],
    products: [],
    options_types: [],
    options: [],
  });
  const [selectedItem, setSelectedItem] = useState('');
  const getData = async (shop_sid) => {
    const response = await axios.get(
      `http://localhost:3001/store-admin/overview/${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    const myUser = JSON.parse(localStorage.getItem('StoreDatas'));

    // 取得店家菜單資料
    getData(myUser.sid);
    console.log(data);
  }, []);

  return (
    <DragDropContext>
      <div className="store-admin">
        <Link to="/productList/?shop_sid=89">商品列表</Link>
        {data.types.map((type) => {
          return (
            <div className="product-area">
              <div className="top">
                <div className="left">
                  <i className="fa-solid fa-equals"></i>
                  <p key={type.sid}>{type.name}</p>
                </div>
                <div className="right">
                  <i class="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <div className="middle">
                {data.products
                  .filter((product) => {
                    return product.products_type_sid === type.sid;
                  })
                  .map((product) => {
                    return (
                      <div className="product-box">
                        <div className="left">
                          <i class="fa-solid fa-equals"></i>
                          <img
                            src={`http://localhost:3001/uploads/${product.src}`}
                            alt=""
                          />
                          <p
                            onClick={() => {
                              setSelectedItem(product.sid);
                            }}
                          >
                            {[product.name]}
                          </p>
                        </div>
                        <div className="right">
                          <div className="number-input">
                            <div>NT$</div>
                            <input
                              type="number"
                              name="price"
                              value={product.price}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="bottom">
                <div className="sm-white-btn">
                  <i></i>
                  <p></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default Overview;
