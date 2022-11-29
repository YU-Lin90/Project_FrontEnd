import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function Menubar() {
  return (
    <>
      <div className="store-admin">
        <ul className="menubar">
          <li>
            <Link to="/Store/StoreTypeEdit">總覽</Link>
          </li>
          <li>
            <Link to="/Store/StoreTypeEdit/type">類別</Link>
          </li>
          <li>
            <Link to="/Store/StoreTypeEdit/product">餐點</Link>
          </li>
          <li>
            <Link to="/Store/StoreTypeEdit/option">客製化選項</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
}

export default Menubar;
