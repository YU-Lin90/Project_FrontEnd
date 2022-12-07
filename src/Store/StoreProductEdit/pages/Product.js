import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ProductEditForm from '../components/ProductEditForm';
import $ from 'jquery';

function Product() {
  const siteName = window.location.hostname;

  const [data, setData] = useState({
    types: [],
    products: [],
    options_types: [],
    only_options_types: [],
  });
  // 找到目前使用者的shop_sid
  const [myUserSid, setMyUserSid] = useState();

  // 預覽圖片的state
  const [imgSrc, setImgSrc] = useState('');

  // 目前正在編輯的商品的sid，sid=0就是新增商品。
  const [selectedItem, setSelectedItem] = useState('');
  const [formData, setFormData] = useState({
    src: '',
    name: '',
    price: '',
    type: '',
    options_types: [],
    note: '',
    discount: '',
    available: '',
  });

  const [reload, setReload] = useState(0);
  // 展示用的資料
  const [displayData, setDisplayData] = useState({
    types: [],
    products: [],
    options_types: [],
    only_options_types: [],
  });
  const [selectedType, setSelectedType] = useState({ sid: '', name: '' });
  const [searchInput, setSearchInput] = useState('');

  const getData = async (shop_sid) => {
    console.log(shop_sid);
    const response = await axios.get(
      `http://${siteName}:3001/store-admin/product/${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    setMyUserSid(JSON.parse(localStorage.getItem('StoreDatas')).sid);
    // 取得店家菜單資料
    getData(JSON.parse(localStorage.getItem('StoreDatas')).sid);
  }, [selectedItem]);

  useEffect(() => {
    // 更新展示的資料
    setDisplayData(data);
  }, [data]);

  useEffect(() => {
    if (selectedType.sid) {
      const newDisplayData = { ...data };
      const newProducts = newDisplayData.products.filter((product) => {
        return product.products_type_sid === selectedType.sid;
      });
      console.log(newDisplayData);
      setDisplayData({ ...newDisplayData, products: newProducts });
    } else {
      setDisplayData(data);
    }
  }, [selectedType]);

  // 新贓商品的儲存按鈕被按下時
  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://${siteName}:3001/store-admin/product/${myUserSid}`,
      fd
    );
    setReload((v) => v + 1);
    setSelectedItem('');
  };

  // 快速填入
  const fillOutForm = () => {
    document.form1.name.value = '鴛鴦奶茶';
    document.form1.price.value = 70;
    document.form1.type.value = 2;
    document.form1.note.value = 'abc';
    document.form1.discount.value = 5;
  };

  // 上傳圖片時
  const uploadHandler = () => {};

  const addBtnHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://${siteName}:3001/store-admin/product/${myUserSid}`,
      fd
    );
    console.log(response.data);
    setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  const editBtnHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.put(
      `http://${siteName}:3001/store-admin/product/${myUserSid}`,
      fd
    );
    console.log(response.data);
    setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  const delBtnHandler = async (e) => {
    e.preventDefault();
    const response = await axios.delete(
      `http://${siteName}:3001/store-admin/product/${selectedItem}`
    );
    setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  const uploadImgHandler = (e) => {
    console.log(e.target.files);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        setImgSrc(reader.result);
        // preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
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
                <div className="menu-title">
                  <h4>餐點</h4>
                  <div
                    className="bg-black-btn"
                    onClick={() => {
                      setSelectedItem(0);
                      setFormData({
                        src: '',
                        name: '',
                        price: '',
                        type: '',
                        options_types: [],
                        note: '',
                        discount: '',
                        available: '',
                      });
                    }}
                  >
                    <i class="fa-solid fa-plus btn-icon"></i>
                    <p>新增餐點</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="search-area">
                  <div className="search-box">
                    <div>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                      type="text"
                      name="name"
                      // value={}
                      // value={opt.name}
                      // onChange={(e) => {
                      //   const newOptionData = [...optionData];
                      //   newOptionData[index].name = e.target.value;
                      //   setOptionData(newOptionData);
                      // }}
                    />
                  </div>
                  <div className="select-box">
                    <div
                      className="select"
                      onClick={(e) => {
                        $(e.currentTarget)
                          .siblings('ul')
                          .find('li')
                          .slideToggle();
                      }}
                    >
                      <p>{selectedType.sid ? selectedType.name : '全部'}</p>
                      <div className="arrow">
                        <i className="fa-solid fa-caret-down"></i>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <p
                          onClick={(e) => {
                            setSelectedType({
                              sid: '',
                              name: '',
                            });
                            $(e.currentTarget)
                              .closest('ul')
                              .find('li')
                              .slideToggle();
                          }}
                        >
                          全部
                        </p>
                      </li>
                      {data.types.map((type) => {
                        return (
                          <li>
                            <p
                              onClick={(e) => {
                                setSelectedType({
                                  sid: type.sid,
                                  name: type.name,
                                });
                                $(e.currentTarget)
                                  .closest('ul')
                                  .find('li')
                                  .slideToggle();
                              }}
                            >
                              {type.name}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="table">
                  <div className="thead">
                    <div className="tr-product">
                      <div className="th">圖片</div>
                      <div className="th">名稱</div>
                      <div className="th">價格</div>
                      <div className="th">類別</div>
                      <div className="th">使用客製化選項</div>
                      <div className="th">說明</div>
                      <div className="th">是否上架</div>
                    </div>
                  </div>
                  <div className="tbody">
                    {displayData.products.map((product) => {
                      return (
                        <div
                          className="tr-product"
                          onClick={() => {
                            setSelectedItem(product.sid);
                            setFormData({
                              sid: product.sid,
                              src: product.src,
                              name: product.name,
                              price: product.price,
                              type: product.products_type_sid,
                              options_types: data.options_types
                                .filter((ot) => {
                                  return product.sid === ot.product_sid;
                                })
                                .map((ot) => {
                                  return ot.sid;
                                }),
                              note: product.note,
                              discount: product.discount,
                              available: product.available,
                            });
                          }}
                        >
                          <div className="td w10">
                            <img
                              src={`http://${siteName}:3001/uploads/${product.src}`}
                              alt=""
                            />
                          </div>
                          <div className="td line-1">{product.name}</div>
                          <div className="td">NT${product.price}.00</div>
                          <div className="td">{product.type_name}</div>
                          <div className="td line-2">
                            {displayData.options_types
                              .filter((ot) => {
                                return ot.product_sid === product.sid;
                              })
                              .map((ot) => {
                                return ot.name;
                              })
                              .join()}
                          </div>
                          <div className="td line-2">{product.note}</div>
                          <div className="td">
                            {product.available ? '上架中' : '未上架'}
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
            <ProductEditForm
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            {/* <div className={`menu-container`}>
              <div className="row">
                <div className="top-edit-bar">
                  <div className="left-btn-group">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedItem('');
                        setImgSrc('');
                      }}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </div>
                  </div>
                  <div className="right-btn-group">
                    {selectedItem ? (
                      <div onClick={delBtnHandler} className="sm-white-btn">
                        <p>刪除</p>
                      </div>
                    ) : (
                      ''
                    )}

                    <div onClick={fillOutForm} className="sm-white-btn">
                      快速填入
                    </div>
                    <div
                      className="sm-black-btn"
                      onClick={selectedItem ? editBtnHandler : addBtnHandler}
                    >
                      <p>儲存</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="edit-form">
                  <form action="" onSubmit={submitHandler} name="form1">
                    <label hidden>
                      <input
                        type="number"
                        value={selectedItem ? formData.sid : ''}
                        name="sid"
                        onFocus={(e) => e.preventDefault()}
                      />
                    </label>

                    <label>
                      <input
                        type="text"
                        name="name"
                        value={!(selectedItem === '') ? formData.name : ''}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                        }}
                        placeholder="名稱"
                      />
                    </label>
                    <div className="previewImg">
                      <div className="img">
                        <img
                          src={
                            imgSrc
                              ? imgSrc
                              : `http://${siteName}:3001/uploads/${formData.src}`
                          }
                          alt=""
                        />
                      </div>
                      <div className="direction">
                        <p>
                          餐點相片可協助顧客決定訂購哪些美食，進而提升銷售量。
                        </p>
                        <p>
                          檔案規定：JPG、PNG、GIF 或 WEBP 格式，不可超過 10 MB。
                          所需的最低像素：寬度和高度為 320 x 320 像素。
                        </p>
                        <label hidden>
                          <input
                            className="imgInput"
                            type="file"
                            name="avatar"
                            onChange={uploadImgHandler}
                          />
                        </label>
                        <div
                          onClick={() => {
                            document.form1.avatar.click();
                          }}
                        >
                          <div className="sm-black-btn">新增相片</div>
                        </div>
                      </div>
                    </div>

                    <div className="note-box">
                      <p>說明</p>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="3"
                        placeholder="輸入說明"
                      ></textarea>
                    </div>

                    <select
                      name="type"
                      id=""
                      value={!(selectedItem === '') ? formData.type : ''}
                      onChange={(e) => {
                        setFormData({ ...formData, type: e.target.value });
                      }}
                    >
                      {data.types.map((type) => {
                        return <option value={type.sid}>{type.name}</option>;
                      })}
                    </select>

                    <div className="price-box">
                      <p>價格</p>
                      <div className="number-input">
                        <div>NT$</div>
                        <input
                          type="number"
                          name="price"
                          value={!(selectedItem === '') ? formData.price : ''}
                          onChange={(e) => {
                            setFormData({ ...formData, price: e.target.value });
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      {data.only_options_types.map((ot) => {
                        return (
                          <label>
                            <input
                              key={ot.sid}
                              type="checkbox"
                              name="options_types"
                              value={ot.sid}
                              checked={
                                selectedItem === ''
                                  ? false
                                  : formData.options_types.includes(ot.sid)
                              }
                              onChange={(e) => {
                                const newData = { ...formData };
                                const index = newData.options_types.indexOf(
                                  ot.sid
                                );
                                index === -1
                                  ? newData.options_types.push(ot.sid)
                                  : newData.options_types.splice(index, 1);
                                setFormData(newData);
                              }}
                            />
                            {ot.name}
                          </label>
                        );
                      })}
                    </div>

                    <label>
                      餐點說明:
                      <input
                        type="text"
                        name="note"
                        value={!(selectedItem === '') ? formData.note : ''}
                        onChange={(e) => {
                          setFormData({ ...formData, note: e.target.value });
                        }}
                      />
                    </label>

                    <label>
                      折扣後價格:
                      <input
                        type="number"
                        name="discount"
                        value={!(selectedItem === '') ? formData.price : ''}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            discount: e.target.value,
                          });
                        }}
                        hidden
                      />
                    </label>

                    <label>
                      是否上架:
                      <input
                        type="checkbox"
                        name="available"
                        checked={
                          !(selectedItem === '') ? !!formData.available : true
                        }
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            available: e.target.checked ? 1 : 0,
                          });
                        }}
                      />
                    </label>
                  </form>
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
    </>
  );
}

export default Product;
