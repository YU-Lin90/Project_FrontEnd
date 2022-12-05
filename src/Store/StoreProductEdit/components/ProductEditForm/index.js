import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductEditForm({ selectedItem, setSelectedItem }) {
  const [imgSrc, setImgSrc] = useState('');
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
  const [data, setData] = useState({
    shop: {},
    types: [],
    product: {},
    options_types: [],
    options: [],
    only_options_types: [],
  });

  const getData = async (sid) => {
    const response = await axios.get(
      `http://localhost:3001/store-admin/product/edit-form?sid=${sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    getData(selectedItem);
  }, []);

  useEffect(() => {
    setFormData({
      sid: data.product.sid,
      src: data.product.src,
      name: data.product.name,
      price: data.product.price,
      type: data.product.products_type_sid,
      options_types: data.options_types
        .filter((ot) => {
          return data.product.sid === ot.product_sid;
        })
        .map((ot) => {
          return ot.sid;
        }),
      note: data.product.note,
      discount: data.product.discount,
      available: data.product.available,
    });
  }, [data]);

  const fillOutForm = () => {
    document.form1.name.value = '鴛鴦奶茶';
    document.form1.price.value = 70;
    document.form1.type.value = 2;
    document.form1.note.value = 'abc';
    document.form1.discount.value = 5;
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://localhost:3001/store-admin/product/${data.shop.sid}`,
      fd
    );
    // setReload((v) => v + 1);
    setSelectedItem('');
  };

  const delBtnHandler = async (e) => {
    e.preventDefault();
    const response = await axios.delete(
      `http://localhost:3001/store-admin/product/${selectedItem}`
    );
    // setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  const addBtnHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://localhost:3001/store-admin/product/${data.shop.sid}`,
      fd
    );
    console.log(response.data);
    // setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  const editBtnHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.put(
      `http://localhost:3001/store-admin/product/${data.shop.sid}`,
      fd
    );
    console.log(response.data);
    // setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  return (
    <>
      <div className={`menu-container`}>
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
                        : `http://localhost:3001/uploads/${formData.src}`
                    }
                    alt=""
                  />
                </div>
                <div className="direction">
                  <p>餐點相片可協助顧客決定訂購哪些美食，進而提升銷售量。</p>
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
                  value={!(selectedItem === '') ? formData.note : ''}
                  onChange={(e) => {
                    setFormData({ ...formData, note: e.target.value });
                  }}
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
                          const index = newData.options_types.indexOf(ot.sid);
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

              {/* <label>
                餐點說明:
                <input
                  type="text"
                  name="note"
                  value={!(selectedItem === '') ? formData.note : ''}
                  onChange={(e) => {
                    setFormData({ ...formData, note: e.target.value });
                  }}
                />
              </label> */}

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
                  checked={!(selectedItem === '') ? !!formData.available : true}
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
      </div>
    </>
  );
}

export default ProductEditForm;
