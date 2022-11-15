//訂單第二層
import OrderDetailsCard from '../OrderDetailsCard';
function StoreOrderDetails({ page, datas, setOpenDetail }) {
  return (
    <>
      {datas.length > 0 ? (
        <div className="w100p disf fw-w ">
          {datas.map((v, i) => {
            return (
              <OrderDetailsCard
                setOpenDetail={setOpenDetail}
                page={page}
                datas={v}
                key={v.sid}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default StoreOrderDetails;
