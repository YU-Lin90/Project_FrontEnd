import React, { useState, useContext, createContext } from 'react';
const siteName = window.location.hostname;
const FunctionContext = createContext(null);

export const FunctionProvider = ({ children }) => {
  //有帶登入檢查的FETCH
  //回傳RES                (API連結 ,哪方,post資料 json格式 )
  const loginCheckPostFetch = async (apiLink, who, postData) => {
    const r = await fetch(`http://${siteName}:3001/${apiLink}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(who),
      },
      body: postData,
    });
    const res = await r.json();
    return res;
  };
  //GET 回傳RES
  const loginCheckGetFetch = async (apiLink, who) => {
    const r = await fetch(`http://${siteName}:3001/${apiLink}`, {
      method: 'Get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(who),
      },
    });
    const res = await r.json();
    return res;
  };

  return (
    <FunctionContext.Provider
      value={{ loginCheckPostFetch, loginCheckGetFetch }}
    >
      {children}
    </FunctionContext.Provider>
  );
};

export const useFunc = () => useContext(FunctionContext);
