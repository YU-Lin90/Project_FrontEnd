import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OptionGroup from './OptionGroup';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../../../../Context/CartProvider';

function OptionForm({
  selectedSid,
  selectedItem,
  setSelectedItem,
  data,
  details,
  setDetails,
  amount,
  setAmount,
  intoCart,
}) {
  return (
    <div className={`option-form`}>
      <div className="row">
        <div className="product-img">
          <div
            className="back-btn"
            onClick={() => {
              setSelectedItem({
                sid: '',
                name: '',
                price: '',
                src: '',
                note: '',
                min: '',
                max: '',
                finalPrice: '',
              });
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <img
            src={`http://localhost:3001/uploads/${[selectedItem.src]}`}
            alt="餐點圖片"
          />
        </div>
      </div>
      <div className="row">
        <div className="product-info">
          <div className="top">
            <h5>{selectedItem.name}</h5>
            <p>$ {selectedItem.price}</p>
          </div>
          <div className="bottom">
            <p>{selectedItem.note}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="option-section">
          <div className="option-box">
            {data.options_types
              .filter((ot) => {
                return ot.product_sid === selectedItem.sid;
              })
              .map((ot) => {
                return (
                  <div className="option-box">
                    <div className="option-type">
                      <div className="top">
                        <h6>{ot.name}</h6>
                        <p>{!ot.min ? '' : `${ot.min}必填`}</p>
                      </div>
                      <div className="bottom">
                        <p>
                          {ot.min === 1 && ot.max === 1
                            ? '選擇1項'
                            : ot.max > 1 && ot.min > 0
                            ? `最多可選擇${ot.max}項(最少選擇${ot.min}項)`
                            : ot.max > 1 && ot.min === 0
                            ? `最多可選擇${ot.max}項(可不選擇)`
                            : null}
                        </p>
                      </div>
                    </div>
                    <div className="option-list">
                      <OptionGroup
                        ot={ot}
                        data={data}
                        details={details}
                        setDetails={setDetails}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="amount-section">
          <div className="left">
            <i
              className={`fa-solid fa-minus ${amount <= 1 ? 'inActive' : ''}`}
              onClick={() => {
                if (amount > 1) setAmount(amount - 1);
              }}
            ></i>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <i
              className="fa-solid fa-plus"
              onClick={() => {
                if (amount > 0) setAmount(amount + 1);
              }}
            ></i>
          </div>
          <div className="right">
            <div className="inActive" onClick={intoCart}>
              <p>放入購物車</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionForm;
