import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function Menubar() {
  return (
    <>
      <ul>
        {/* <li>
          <Link to="/productList">商店列表</Link>
        </li> */}
        <li>
          <Link to="/Store/StoreTypeEdit">總覽</Link>
        </li>
        <li>
          <Link to="/Store/StoreTypeEdit/type">商品類別</Link>
        </li>
        <li>
          <Link to="/Store/StoreTypeEdit/product">商品</Link>
        </li>
        <li>
          <Link to="/Store/StoreTypeEdit/option">客製化選項</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default Menubar;
