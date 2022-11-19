import { useCart } from '../Context/CartProvider';
function CartTemp() {
  //Function
  const { addCart, reduceCart } = useCart();

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
