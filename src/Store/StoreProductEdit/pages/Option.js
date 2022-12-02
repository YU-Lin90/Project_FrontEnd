import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import InputHash from '../components/InputHash';

function Option() {
  const [data, setData] = useState({
    options_types: [],
    options: [],
  });
  const [myUserSid, setMyUserSid] = useState();
  const [formData, setFormData] = useState({
    sid: '',
    name: '',
    min: '',
    max: '',
  });
  const [optionData, setOptionData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [inputText, setInputText] = useState('');

  const getData = async (shop_sid) => {
    console.log(shop_sid);
    const response = await axios.get(
      `http://localhost:3001/store-admin/option/${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    setMyUserSid(JSON.parse(localStorage.getItem('StoreDatas')).sid);
    // 取得店家菜單資料
    getData(JSON.parse(localStorage.getItem('StoreDatas')).sid);
  }, []);

  const insertBtnHandler = (e) => {
    e.preventDefault();
    const newOptionData = [...optionData];
    newOptionData.push({
      sid: 0,
      name: inputText,
      price: 0,
    });
    setOptionData(newOptionData);
    setInputText('');
  };

  const addBtnHandler = async (e) => {
    e.preventDefault();
    console.log({ ...formData, optionData });
    const response = await axios.post(
      `http://localhost:3001/store-admin/option/${myUserSid}`,
      { ...formData, optionData }
    );
    console.log(response.data);
  };

  const editBtnHandler = async (e) => {
    e.preventDefault();
    console.log({ ...formData, optionData });
    const response = await axios.put(
      `http://localhost:3001/store-admin/option/${myUserSid}`,
      { ...formData, optionData }
    );
    console.log(response.data);
  };

  const delBtnHandler = async (e) => {
    e.preventDefault();
    const response = await axios.delete(
      `http://localhost:3001/store-admin/option/${selectedItem}`
    );
  };
  return (
    <>
      <div className="store-admin">
        {!(selectedItem === '') ? (
          <></>
        ) : (
          <>
            <div className={`menu-container`}>
              <div className="row">
                <div
                  onClick={() => {
                    setSelectedItem(0);
                    setFormData({
                      sid: '',
                      name: '',
                      min: '',
                      max: '',
                    });
                    setOptionData([]);
                  }}
                >
                  新增選項類別
                </div>
                <div className="table">
                  <div className="thead">
                    <div className="tr">
                      <div className="th th-3">名稱</div>
                      <div className="th th-3">包含選項</div>
                      <div className="th th-3">說明</div>
                    </div>
                  </div>
                  <div className="tbody">
                    {data.options_types.map((ot) => {
                      return (
                        <div
                          className="tr"
                          onClick={() => {
                            setSelectedItem(ot.sid);
                            setFormData({
                              sid: ot.sid,
                              name: ot.name,
                              min: ot.min,
                              max: ot.max,
                            });
                            const newOptionData = data.options
                              .filter((opt) => {
                                return opt.options_type_sid === ot.sid;
                              })
                              .map((opt) => {
                                return {
                                  sid: opt.sid,
                                  name: opt.name,
                                  price: opt.price,
                                };
                              });
                            console.log(newOptionData);
                            setOptionData(newOptionData);
                          }}
                        >
                          <div className="td td-3">{ot.name}</div>
                          <div className="td td-3">
                            {data.options
                              .filter((opt) => {
                                return opt.options_type_sid === ot.sid;
                              })
                              .map((opt) => {
                                return opt.name;
                              })
                              .join()}
                          </div>
                          <div className="td td-3">
                            至少選{ot.min}項，至多選{ot.max}項
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedItem === '' ? (
          <></>
        ) : (
          <>
            <div className={`menu-container`}>
              <div className="row">
                <form action="" name="form1">
                  <input
                    type="number"
                    name="sid"
                    value={selectedItem ? formData.sid : ''}
                    hidden
                  />
                  <label>
                    選項群組名稱:
                    <input
                      type="text"
                      name="name"
                      value={!(selectedItem === '') ? formData.name : ''}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                      }}
                    />
                  </label>
                  <label>
                    顧客最少必須選擇幾個客製化項目?
                    <input
                      type="number"
                      name="min"
                      value={!(selectedItem === '') ? formData.min : ''}
                      onChange={(e) => {
                        setFormData({ ...formData, min: e.target.value });
                      }}
                    />
                  </label>
                  <label>
                    顧客最多可以選擇幾個客製化項目?
                    <input
                      type="number"
                      name="max"
                      value={!(selectedItem === '') ? formData.max : ''}
                      onChange={(e) => {
                        setFormData({ ...formData, max: e.target.value });
                      }}
                    />
                  </label>
                  <div>
                    <br />
                    <h3>選項:</h3>
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => {
                        setInputText(e.target.value);
                      }}
                    />
                    <button onClick={insertBtnHandler}>新增</button>
                    <div className="table">
                      {optionData.map((opt, index) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <label>
                                  sid:
                                  <input
                                    type="number"
                                    name="option_sid"
                                    value={opt.sid}
                                  />
                                </label>
                              </td>
                              <td>
                                <label>
                                  name:
                                  <input
                                    type="text"
                                    name="name"
                                    value={opt.name}
                                    onChange={(e) => {
                                      const newOptionData = [...optionData];
                                      newOptionData[index].name =
                                        e.target.value;
                                      setOptionData(newOptionData);
                                    }}
                                  />
                                </label>
                              </td>
                              <td>
                                <label>
                                  price:
                                  <input
                                    type="number"
                                    name="price"
                                    value={opt.price}
                                    onChange={(e) => {
                                      const newOptionData = [...optionData];
                                      newOptionData[index].price =
                                        e.target.value;
                                      setOptionData(newOptionData);
                                    }}
                                  />
                                </label>
                              </td>
                              <td>
                                <i
                                  class="fa-solid fa-xmark"
                                  onClick={() => {
                                    const newOptionData = [...optionData];
                                    newOptionData.splice(index, 1);
                                    setOptionData(newOptionData);
                                  }}
                                ></i>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    onClick={selectedItem ? editBtnHandler : addBtnHandler}
                  >
                    儲存
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedItem('');
                    }}
                  >
                    取消
                  </button>
                  {selectedItem ? (
                    <button onClick={delBtnHandler}>刪除</button>
                  ) : (
                    ''
                  )}
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Option;
