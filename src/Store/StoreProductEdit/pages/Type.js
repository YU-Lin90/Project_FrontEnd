import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import EditTypeForm from '../components/EditTypeForm';
import '../styles/style.css';

function Type() {
  const [data, setData] = useState({
    types: [],
    products: [],
  });

  // 如果sid===''，則隱藏editBox；如果sid===0，則跳出新增的editBox；如果有sid則跳出可修改該type的editBox
  const [editType, setEditType] = useState({
    type_sid: '',
    type_name: '',
  });

  const getData = async (myUser) => {
    const response = await axios.get(
      `http://localhost:3001/store-admin/type/${myUser}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    const myUser = JSON.parse(localStorage.getItem('StoreDatas'));

    // 取得店家菜單資料
    getData(myUser.sid);
    // console.log(data);
  }, []);

  // 點擊儲存按鈕
  const addBtnHandler = async () => {
    // 因為insert一筆新的資料需要shop_sid，所以先找到localStorage的sid
    const myUserId = JSON.parse(localStorage.getItem('StoreDatas')).sid;
    const response = await axios.post(
      `http://localhost:3001/store-admin/type/${myUserId}`,
      editType
    );
    console.log(response.data.error);
  };

  const editBtnHandler = async (sid) => {
    const response = await axios.put(
      `http://localhost:3001/store-admin/type/${sid}`,
      editType
    );
  };

  const delBtnHandler = async (sid) => {
    const response = await axios.delete(
      `http://localhost:3001/store-admin/type/${sid}`
    );
  };

  return (
    <>
      <div className="store-admin">
        <div
          className={`menu-container ${
            !(editType.type_sid === '') ? 'noDisplay' : ''
          }`}
        >
          <div className="row">
            <div className="menu-title">
              <h4>類別</h4>
              <div
                className="bg-black-btn"
                onClick={() => {
                  setEditType({ ...editType, type_name: '', type_sid: 0 });
                }}
              >
                <i class="fa-solid fa-plus btn-icon"></i>
                <p>新增類別</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="table">
              <div className="thead">
                <div className="tr-type">
                  <div className="th">名稱</div>
                  <div className="th">項目數量</div>
                  <div className="th">項目內容</div>
                </div>
              </div>
              <div className="tbody">
                {data.types.map((type, index) => {
                  return (
                    <div
                      className="tr-type"
                      key={type.sid}
                      // 點到誰就把editType變成誰
                      onClick={() => {
                        setEditType({
                          ...editType,
                          type_sid: type.sid,
                          type_name: type.name,
                        });
                      }}
                    >
                      <div className="td">{type.name}</div>
                      <div className="td">
                        {
                          data.products.filter((p) => {
                            return p.products_type_sid === type.sid;
                          }).length
                        }
                      </div>
                      <div className="td">
                        {data.products
                          .filter((p) => {
                            return p.products_type_sid === type.sid;
                          })
                          .map((p) => {
                            return p.name;
                          })
                          .join()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`menu-container ${
            editType.type_sid === '' ? 'noDisplay' : ''
          }`}
        >
          <div className="row">
            <div className="top-edit-bar">
              <div className="left-btn-group">
                <div
                  onClick={() => {
                    setEditType({ type_name: '', type_sid: '' });
                  }}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
              </div>

              <div className="right-btn-group">
                {editType.type_sid === 0 ? (
                  ''
                ) : (
                  <div
                    className="sm-white-btn"
                    onClick={() => {
                      delBtnHandler(editType.type_sid);
                    }}
                  >
                    <p>刪除</p>
                  </div>
                )}
                <div
                  className="sm-black-btn"
                  onClick={
                    editType.type_sid === 0
                      ? addBtnHandler
                      : () => {
                          editBtnHandler(editType.type_sid);
                        }
                  }
                >
                  <p>儲存</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="edit-form">
              <form action="" name="editForm">
                <label hidden>
                  <input
                    type="number"
                    name="type_sid"
                    value={editType.type_sid}
                  />
                </label>

                <label>
                  <input
                    type="text"
                    name="type_name"
                    value={editType.type_name}
                    onChange={(e) => {
                      setEditType({
                        ...editType,
                        type_name: e.target.value,
                      });
                    }}
                    placeholder="名稱"
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Type;
