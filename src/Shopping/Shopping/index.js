import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListTable from './ListTable';
import Search_Bar from './Search_Bar';
import './Shopping_RWD.css';
import './Shopping.css';
const siteName = window.location.hostname;

function Shopping() {
  //渲染
  return (
    <>
      <div className="row">
        <ListTable></ListTable>
      </div>
    </>
  );
}

export default Shopping;
