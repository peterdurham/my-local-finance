import React, { useState } from "react";
import styled from "styled-components";

import USD from "../../images/currencies/usd.jpg";
import EURO from "../../images/currencies/euro.jpg";
import JPY from "../../images/currencies/jpy.jpg";
import GBP from "../../images/currencies/gbp.jpg";
import AUD from "../../images/currencies/aud.jpg";
import CAD from "../../images/currencies/cad.jpg";
import CHF from "../../images/currencies/chf.jpg";
import NZD from "../../images/currencies/nzd.jpg";

const Currency = ({
  auth,
  setShowModal,
  setCurrencyToAdd,
  setAdding,
  setCurrencyToUpdate,
  setCurrentAmount,
  setUpdating,
  image,
  symbol,
  name,
  amount,
}) => {
  let currencyImage;
  if (symbol === "USD") currencyImage = <img src={USD} />;
  else if (symbol === "EURO") currencyImage = <img src={EURO} />;
  else if (symbol === "JPY") currencyImage = <img src={JPY} />;
  else if (symbol === "GBP") currencyImage = <img src={GBP} />;
  else if (symbol === "AUD") currencyImage = <img src={AUD} />;
  else if (symbol === "CAD") currencyImage = <img src={CAD} />;
  else if (symbol === "CHF") currencyImage = <img src={CHF} />;
  else if (symbol === "NZD") currencyImage = <img src={NZD} />;

  const openAddCurrencyModal = (e) => {
    setShowModal(true);
    setAdding(true);
    setCurrencyToAdd(symbol);
  };

  const openUpdateCurrencyModal = (e) => {
    setShowModal(true);
    setUpdating(true);
    setCurrentAmount(amount);
    setCurrencyToUpdate(symbol);
  };

  return (
    <CurrencyStyles>
      <div>{currencyImage}</div>
      <div>{symbol}</div>
      <div>{name}</div>
      {auth.isAuthenticated ? <div>${amount}</div> : <div>nothing</div>}
      {auth.isAuthenticated ? (
        <div>
          {amount > 0 ? (
            <button onClick={openUpdateCurrencyModal}>update</button>
          ) : (
            <button onClick={openAddCurrencyModal}>Add</button>
          )}
        </div>
      ) : (
        <div>please log in</div>
      )}
    </CurrencyStyles>
  );
};

const CurrencyStyles = styled.div`
  display: flex;
  margin-bottom: 20px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
  div {
    flex-basis: 20%;
  }
`;
export default Currency;
