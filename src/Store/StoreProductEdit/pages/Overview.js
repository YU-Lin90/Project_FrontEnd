import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OptionGroup from '../components/OptionGroup';

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
    const myUser = JSON.parse(localStorage.getItem('user'));

    // 取得店家菜單資料
    getData(myUser.sid);
    console.log(data);
  }, []);

  return (
    <>
      {data.types.map((type) => {
        return (
          <>
            <h1 key={type.sid} style={{ color: 'red' }}>
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
                        setSelectedItem(product.sid);
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
      {selectedItem ? (
        <div>
          {data.options_types
            .filter((ot) => {
              return ot.product_sid === selectedItem;
            })
            .map((ot) => {
              return (
                <div>
                  <h2>{ot.name}</h2>
                  <div>
                    <OptionGroup ot={ot} data={data} />
                  </div>
                </div>
              );
            })}
          <div>
            <i
              class="fa-solid fa-plus"
              onClick={() => {
                if (amount > 0) setAmount(amount - 1);
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
              class="fa-solid fa-minus"
              onClick={() => {
                setAmount(amount + 1);
              }}
            ></i>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Overview;
