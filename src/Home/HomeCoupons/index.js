import { useEffect, useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
function HomeCoupons() {
  const { notLoginGetFetch } = useFunc();
  const [couponDatas, setCouponDatas] = useState([]);
  const getCoupons = async () => {
    const res = await notLoginGetFetch('HomePageGetCoupon');
    // console.log(res);
    setCouponDatas(res);
  };
  useEffect(() => {
    getCoupons();
  }, []);
  /* {
    "sid": 2,
    "coupon_name": "滿2000折50",
    "shop_sid": 89,
    "sale_detail": 50,
    "use_range": 2000,
    "need_point": 100,
    "get_limit_time": "2022-12-10 00:00:00",
    "expire": "2022-12-10 00:00:00",
    "coupon_available": 1,
    "coupon_complete": 0,
    "name": "I’m PASTA 和平店"
  } */
  return (
    <>
      <div className="w100p padH20 marb20">
        <p className="homePageLogos">優惠券</p>

        <div className="homePageCouponFrame">
          {couponDatas.map((v, i) => {
            return (
              <div key={v.sid} className="b33s100 w33p padH10">
                <div className="bgcMain padV15 padH10 disf fd-c pointer homePageCouponPerFrame">
                  <p className="as-s marb20">{v.name}</p>
                  <p className="as-c marb20 fs28 fw5 marV10 w100p va-m">
                    {v.coupon_name}
                  </p>
                  <p className="as-e ">使用期限：{v.expire}</p>
                </div>
              </div>
            );
          })}
          {/*  */}
          {/* <div className="w33p padH10 ">
            <div className="bgcMain padV15 padH10 disf fd-c">
              <p className="as-s marb20">店家名稱</p>
              <p className="as-c marb20 fs28 fw5 marV10 w100p va-m">
                優惠券名稱
              </p>
              <p className="as-e ">使用期限：</p>
            </div>
          </div> */}
          {/*  */}
        </div>
      </div>
    </>
  );
}
export default HomeCoupons;
