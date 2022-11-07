import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider';
import './reset.css';
import './CssTemplate.css';
//一般首頁
import IndexPage from './IndexPage';
//首頁內容
import Home from './Home';
//會員登入
import MemberLogin from './Member/MemberLogin';
//會員中心
import MemberLayout from './Member/MemberLayout';
//會員中心內容 會員資料
import MemberDatas from './Member/MemberDatas';
//會員中心 紅利點數
import MemberPoint from './Member/MemberPoint';
//會員中心 訂單紀錄
import MemberOrder from './Member/MemberOrder';
//會員中心 優惠券
import MemberCoupon from './Member/MemberCoupon';

//購物車加減 臨時頁
import CartTemp from './Temp/CartTemp';
//店家首頁
import Store from './Store';
//店家首頁內容
import StoreHome from './Store/StoreHome';
//店家登入
import StoreLogin from './Store/StoreLogin';
//管理者首頁
import Admin from './Admin';
//管理者首頁內容
import AdminHome from './Admin/AdminHome';

import EditCoupon from './Admin/EditCoupon';

//404
import NoFound from './NoFound';
function App() {
  return (
    //登入檢查狀態 全域狀態
    <AuthProvider>
      {/* 路由設定 */}
      <BrowserRouter>
        <Routes>
          {/* 店家  */}
          {/* 店家首頁 放店家Navbar  */}
          <Route path="/Store" element={<Store />}>
            {/* 店家基礎頁 */}
            {/* ~/Store/ */}
            <Route index element={<StoreHome />} />
            {/* 店家登入 */}
            {/* ~/Store/StoreLogin */}
            <Route path="StoreLogin" element={<StoreLogin />} />
            {/* 店家現在訂單 */}
            {/* ~/Store */}
            {/* <Route  element={<StoreOrder />} /> */}
            {/* 店家資料頁/編輯 */}
            {/* ~/Store/StoreDatas */}
            {/* <Route path="StoreDatas" element={<StoreDatas />} /> */}
            {/* 店家商品分類管理 */}
            {/* ~/Store/StoreTypeEdit */}
            {/* <Route path="StoreTypeEdit" element={<StoreTypeEdit />} /> */}
            {/* 店家商品管理 */}
            {/* ~/Store/StoreProductEdit */}
            {/* <Route path="StoreProductEdit" element={<StoreOldOrder />} /> */}

            {/* 店家註冊 */}
            {/* ~/Store/StoreRegister */}
            {/* <Route path="StoreRegister" element={<StoreRegister />} /> */}
            {/* 店家歷史訂單 */}
            {/* ~/Store/StoreOldOrder */}
            {/* <Route path="StoreOldOrder" element={<StoreOldOrder />} /> */}
            {/* 店家銷售分析 */}
            {/* ~/Store/StoreSellAnalyze */}
            {/* <Route path="StoreSellAnalyze" element={<StoreSellAnalyze />} /> */}
          </Route>

          {/* 外送員  */}
          {/* <Route path="/Deliver" element={<DeliverLayout />}> */}
          {/* 外送員登入 */}
          {/* ~/Deliver/DeliverLogin */}
          {/* <Route path="DeliverLogin" element={<DeliverLogin />} /> */}
          {/* 外送員註冊 */}
          {/* ~/Deliver/DeliverRegister */}
          {/* <Route path="DeliverRegister" element={<DeliverRegister />} /> */}
          {/* 外送員資料頁/編輯 */}
          {/* ~/Deliver/DeliverDatas */}
          {/* <Route path="DeliverDatas" element={<DeliverDatas />} /> */}
          {/* 外送員接單 */}
          {/* ~/Deliver/DeliverConfirmOrder */}
          {/* <Route
              path="DeliverConfirmOrder"
              element={<DeliverConfirmOrder />}
            /> */}
          {/* 外送員訂單 */}
          {/* ~/Deliver/DeliverOrder */}
          {/* <Route path="DeliverOrder" element={<DeliverOrder />} /> */}
          {/* 外送員即時通訊 */}
          {/* ~/Deliver/DeliverMessager */}
          {/* <Route path="DeliverMessager" element={<DeliverMessager />} /> */}
          {/* </Route> */}

          {/* 管理者  */}
          <Route path="/Admin" element={<Admin />}>
            {/* 管理者基礎頁 */}
            {/* ~/Admin */}
            <Route index element={<AdminHome />} />
            {/* 會員管理 */}
            {/* ~/Admin/EditMemberData */}
            {/* <Route path="EditMemberData" element={<EditMemberData />} /> */}
            {/* 店家管理 */}
            {/* ~/Admin/EditStoreData */}
            {/* <Route path="EditStoreData" element={<EditStoreData />} /> */}
            {/* 優惠券管理 */}
            {/* ~/Admin/EditCoupon */}
            <Route path="EditCoupon" element={<EditCoupon />} />
            {/* 客服 */}
            {/* ~/Admin/Service */}
            {/* <Route path="Service" element={<Service />} /> */}
          </Route>

          {/* 會員/購物首頁 要放會員Navbar */}
          <Route path="/" element={<IndexPage />}>
            {/* 首頁 */}
            {/* ~ */}
            <Route index element={<Home />} />
            {/* ===============================================分隔線================================================ */}
            {/* 購物流程 */}
            {/* 店家列表 QueryString用於篩選 */}
            {/* ~/Shopping */}
            {/* <Route path="Shopping" element={<Shopping />} /> */}
            {/* 店家內商品列表 商品選取用卡片式 不用連結 */}
            {/* ~/StoreDetail */}
            {/* <Route path="StoreDetail" element={<StoreDetail />} /> */}
            {/* 結帳頁 */}
            {/* ~/Pay */}
            {/* <Route path="Pay" element={<Pay />} /> */}
            {/* 優惠券 */}
            {/* ~/Coupon */}
            {/* <Route path="Coupon" element={<Coupon />} /> */}
            {/* 台北市 展示用 其他城市不用做 */}
            {/* ~/City/Taipei */}
            {/* <Route path="/City/Taipei" element={<Taipei />} /> */}
            {/* 測試用購物車頁 */}
            {/* ~/CartTemp */}
            <Route path="CartTemp" element={<CartTemp />} />
            {/* ===============================================分隔線================================================ */}
            {/* 會員中心 */}
            <Route path="Member" element={<MemberLayout />}>
              {/* 會員資料頁/編輯 */}
              {/* ~/Member */}
              <Route index element={<MemberDatas />} />
              {/* 會員登入 */}
              {/* ~/Member/MemberLogin */}
              <Route path="MemberLogin" element={<MemberLogin />} />
              {/* 會員註冊 */}
              {/* ~/Member/MemberRegister */}
              {/* <Route path="MemberRegister" element={<MemberRegister />} /> */}
              {/* 會員訂單紀錄 */}
              {/* ~/Member/MemberOrder */}
              <Route path="MemberOrder" element={<MemberOrder />} />
              {/* 會員優惠券 */}
              {/* ~/Member/MemberCoupon */}
              <Route path="MemberCoupon" element={<MemberCoupon />} />
              {/* 會員紅利明細 */}
              {/* ~/Member/MemberPoint */}
              <Route path="MemberPoint" element={<MemberPoint />} />
              {/* 會員最愛列表 */}
              {/* ~/Member/FavoriteStore */}
              {/* <Route path="FavoriteStore" element={<FavoriteStore />} /> */}
            </Route>
          </Route>

          {/* 404未找到的頁面路由，需放在最下方 */}
          <Route path="*" element={<NoFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
