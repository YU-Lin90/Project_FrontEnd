import { useState } from 'react';
import { useSVG } from '../../../Context/SVGProvider';
function OrderShowOnMap({ selectedOrder, orderShowNow }) {
  const { orderSVG } = useSVG();
  const [openDetail, setOpenDetail] = useState(false);
  return (
    <>
      {' '}
      <div
        onClick={() => {
          setOpenDetail((v) => !v);
        }}
        className={`orderButtonOnMap ${openDetail ? 'open' : 'close'} `}
      >
        {openDetail ? <>123</> : <>{orderSVG('orderButtonOnMapSVG')}</>}
      </div>
    </>
  );
}
export default OrderShowOnMap;
