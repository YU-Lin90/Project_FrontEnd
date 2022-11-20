import { useRef } from 'react';

function OrderMap({ selectedOrder }) {
  const googleMaps = useRef(null);
  return (
    <div>
      <p> 現在選到的訂單SID:{selectedOrder}</p>
      <div></div>
    </div>
  );
}
export default OrderMap;
