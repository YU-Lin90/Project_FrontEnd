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
    finalPrice: '',
  });
  const [details, setDetails] = useState([]);
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
    console.log(data);
  }, []);

  const intoCart = (e) => {
    e.preventDefault()
    addCart(
      data.shop.sid,
      selectedItem.sid,
      data.shop.name,
      selectedItem.name,
      selectedItem.price,
      selectedItem.price,
      selectedItem.src
    );
    const fd = new FormData(document.testForm)
    console.log(fd.get(''))
  }

  return (
    <>
      <div className="shop-information">
        <h1>{data.shop.sid}</h1>
        <h1>{data.shop.name}</h1>
        <h1>{data.shop.address}</h1>
      </div>
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
      {data.types.map((type) => {
        return (
          <>
            <h1 key={type.sid} style={{ color: 'red' }} id={type.sid}>
              {type.name}
            </h1>
            {data.products
              .filter((product) => {
                return product.products_type_sid === type.sid;
              })
              .map((product) => {
                return (
                  <>
                    <h3
                      onClick={() => {
                        const newSelectedItem = { ...selectedItem };
                        newSelectedItem.sid = product.sid;
                        newSelectedItem.name = product.name;
                        newSelectedItem.price = product.price;
                        newSelectedItem.src = product.src;
                        setSelectedItem(newSelectedItem);
                      }}
                    >
                      {[product.name]}
                    </h3>
                  </>
                );
              })}
          </>
        );
      })}
      {selectedItem.sid ? (
        <form name="testForm" onSubmit={(e) => e.preventDefault()}>
          <div>
            {data.options_types
              .filter((ot) => {
                return ot.product_sid === selectedItem.sid;
              })
              .map((ot) => {
                return (
                  <div>
                    <h2>{ot.name}</h2>
                    <div>
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
            <div>
              <i
                class="fa-solid fa-minus"
                onClick={() => {
                  setAmount(amount - 1);
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
                class="fa-solid fa-plus"
                onClick={() => {
                  if (amount > 0) setAmount(amount + 1);
                }}
              ></i>

              <button
                onClick={intoCart}
              >
                放入購物車
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
}

export default ProductList;
