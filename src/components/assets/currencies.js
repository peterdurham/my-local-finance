import React from "react";
import styled from "styled-components";
import { ContainerStyles } from "../styles/containerStyles";
import Currency from "./currency";

const currencyList = [
  {
    symbol: "USD",
    name: "U.S. Dollar",
  },
  {
    symbol: "EURO",
    name: "Euro",
  },
  {
    symbol: "JPY",
    name: "Japanese Yen",
  },
  {
    symbol: "GBP",
    name: "British Pound",
  },
  {
    symbol: "AUD",
    name: "Austrailian Dollar",
  },
  {
    symbol: "CAD",
    name: "Canadian Dollar",
  },
  {
    symbol: "CHF",
    name: "Swiss Franc",
  },
  {
    symbol: "NZD",
    name: "New Zealand Dollar",
  },
];

const Currencies = () => {
  return (
    <>
      <ContainerStyles>
        <h1 className="fade-in-up">Currencies go here</h1>
      </ContainerStyles>
      <ContainerStyles>
        <div>
          {currencyList.map((currency) => (
            <Currency
              key={currency.symbol}
              image={currency.image}
              symbol={currency.symbol}
              name={currency.name}
            />
          ))}
        </div>
      </ContainerStyles>
    </>
  );
};

export default Currencies;
