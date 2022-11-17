function CartTemp() {
  //+
  //+
  function addCart(
    shopSid, // 店家SID
    productSid, //產品SID
    shopName, //店家名稱
    productName, //產品名稱
    price, //產品價格
    cuttedPrice, //產品特價後價格
    imageUrl, //產品圖片連結
    details //其他資訊(選擇等等)
  ) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (!localCart) {
      localCart = {};
    }
    if (!localCart.cartList) {
      localCart.cartList = {};
    }
    if (!localCart.cartList[shopSid]) {
      localCart.cartList[shopSid] = {};
      localCart.cartList[shopSid].shopTotal = 0;
      localCart.cartList[shopSid].shopName = shopName;
    }
    if (!localCart.cartList[shopSid].list) {
      localCart.cartList[shopSid].list = {};
    }
    if (!localCart.cartList[shopSid].list[productSid]) {
      localCart.cartList[shopSid].list[productSid] = {};
    }
    //本來就有就+1 沒有就設定成1
    if (localCart.cartList[shopSid].list[productSid].amount) {
      localCart.cartList[shopSid].list[productSid].amount++;
    }
    //沒設定過要設定商品資訊
    else {
      localCart.cartList[shopSid].list[productSid].amount = 1;
      localCart.cartList[shopSid].list[productSid].name = productName;
      localCart.cartList[shopSid].list[productSid].price = price;
      localCart.cartList[shopSid].list[productSid].cuttedPrice = cuttedPrice;
      localCart.cartList[shopSid].list[productSid].imageUrl = imageUrl;
      localCart.cartList[shopSid].list[productSid].details = details;
    }

    localCart.cartList[shopSid].shopTotal++;

    //店家總金額
    let shopPriceTotal = 0;
    for (let element in localCart.cartList[shopSid].list) {
      if (element) {
        const dividedProduct = localCart.cartList[shopSid].list[element];
        // console.log(shopPriceTotal);
        console.log(localCart.cartList[shopSid].list[element]);
        shopPriceTotal +=
          Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
      }
    }
    localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;

    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
        // console.log(countCartTotal);
      }
    }
    //放回去
    localCart.cartTotal = countCartTotal;
    // localStorage.removeItem("cart");
    localStorage.setItem('cart', JSON.stringify(localCart));
  }
  //-
  function reduceCart(shopSid, productSid) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (
      !localCart ||
      !localCart.cartList ||
      !localCart.cartList[shopSid] ||
      !localCart.cartList[shopSid].list ||
      !localCart.cartList[shopSid].list[productSid] ||
      !localCart.cartList[shopSid].list[productSid].amount
    ) {
      return;
    }
    //判斷現在幾個
    if (localCart.cartList[shopSid].list[productSid].amount > 1) {
      localCart.cartList[shopSid].list[productSid].amount--;
    } else if (localCart.cartList[shopSid].list[productSid].amount === 1) {
      delete localCart.cartList[shopSid].list[productSid].amount;
    }
    //如果是最後一個則清除 不然只-1
    localCart.cartList[shopSid].shopTotal === 1
      ? delete localCart.cartList[shopSid]
      : localCart.cartList[shopSid].shopTotal--;

    //店家總金額
    let shopPriceTotal = 0;
    for (let element in localCart.cartList[shopSid].list) {
      if (element) {
        const dividedProduct = localCart.cartList[shopSid].list[element];
        // console.log(shopPriceTotal);
        console.log(localCart.cartList[shopSid].list[element]);
        shopPriceTotal +=
          Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
      }
    }
    localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;
    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    //如果歸零直接刪除
    if (countCartTotal === 0) {
      localStorage.removeItem('cart');
    } else {
      localCart.cartTotal = countCartTotal;
      // localStorage.removeItem("cart");
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
  }

  return (
    <div className="disf padV20 fd-c jc-c ai-c gap10">
      <div>
        <button
          onClick={() => {
            addCart(1, 2, '一號店', '二號產品', 80, 70, '', {});
          }}
        >
          (1,2)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 2);
          }}
        >
          (1,2)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(2, 3, '二號店', '三號產品', 50, 50, '', {});
          }}
        >
          (2,3)+
        </button>
        <button
          onClick={() => {
            reduceCart(2, 3);
          }}
        >
          (2,3)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 1, '一號店', '一號產品', 40, 40, '', {});
          }}
        >
          (1,1)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 1);
          }}
        >
          (1,1)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(3, 4, '三號店', '四號產品', 20, 10, '', {});
          }}
        >
          (3,4)+
        </button>
        <button
          onClick={() => {
            reduceCart(3, 4);
          }}
        >
          (3,4)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 5, '一號店', '五號產品', 100, 100, '', {});
          }}
        >
          (1,5)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 5);
          }}
        >
          (1,5)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 6, '一號店', '六號產品', 120, 120, '', {});
          }}
        >
          (1,6)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 6);
          }}
        >
          (1,6)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 7, '一號店', '七號產品', 10, 10, '', {});
          }}
        >
          (1,7)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 7);
          }}
        >
          (1,7)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 8, '一號店', '八號產品', 50, 50, '', {});
          }}
        >
          (1,8)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 8);
          }}
        >
          (1,8)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 9, '一號店', '九號產品', 90, 80, '', {});
          }}
        >
          (1,9)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 9);
          }}
        >
          (1,9)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 10, '一號店', '十號產品一', 40, 40, '', {});
          }}
        >
          (1,10)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 10);
          }}
        >
          (1,10)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 11, '一號店', '十一號產品', 40, 40, '', {});
          }}
        >
          (1,11)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 11);
          }}
        >
          (1,11)-
        </button>
      </div>
    </div>
  );
}
export default CartTemp;
