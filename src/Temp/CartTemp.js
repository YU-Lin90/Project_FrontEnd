function CartTemp() {
  //+
  function addCart(shopSid, productSid) {
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
    }
    if (!localCart.cartList[shopSid].list) {
      localCart.cartList[shopSid].list = {};
    }
    //本來就有就+1 沒有就設定成1
    localCart.cartList[shopSid].list[productSid]
      ? localCart.cartList[shopSid].list[productSid]++
      : (localCart.cartList[shopSid].list[productSid] = 1);
    localCart.cartList[shopSid].shopTotal++;

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
      !localCart.cartList[shopSid].list[productSid]
    ) {
      return;
    }
    //判斷現在幾個
    if (localCart.cartList[shopSid].list[productSid] > 1) {
      localCart.cartList[shopSid].list[productSid]--;
    } else if (localCart.cartList[shopSid].list[productSid] === 1) {
      delete localCart.cartList[shopSid].list[productSid];
    }
    //如果是最後一個則清除 不然只-1
    localCart.cartList[shopSid].shopTotal === 1
      ? delete localCart.cartList[shopSid]
      : localCart.cartList[shopSid].shopTotal--;

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
            addCart(1, 2);
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
            addCart(2, 3);
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
            addCart(1, 1);
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
            addCart(3, 4);
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
            addCart(1, 5);
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
            addCart(1, 6);
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
            addCart(1, 7);
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
            addCart(1, 8);
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
            addCart(1, 9);
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
            addCart(1, 10);
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
    </div>
  );
}
export default CartTemp;
