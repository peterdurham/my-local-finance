import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import symbols from "../../stockSymbols.json";
import isEmpty from "../../utils/is-empty";

const StockStyles = styled.div``;
const StockLabel = styled.div`
  background: ${(props) => props.theme.themeLight};
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
`;

const StockPrice = styled.div`
  background: ${(props) => props.theme.themeLight};
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
  width: 100%;
  margin-left: auto;
  .price-label {
    width: 62px;
    display: inline-block;
    text-align: right;
    margin-right: 8px;
  }
  #current-price {
    font-size: 36px;
    font-weight: 700;
  }
  .percentage-change {
    font-size: 24px;
    margin-left: 4px;
  }
`;

const StockHoldings = styled.div`
  background: ${(props) => props.theme.themeLight};
  padding: 16px;
  border-radius: 16px;
  width: 100%;

  #holdings-details {
    display: flex;
    justify-content: space-between;
  }
  #holdings-details button {
    padding: 6px 14px;
    color: ${(props) => props.theme.textLight};
    border: 2px solid ${(props) => props.theme.accentPurple};
    border-radius: 24px;
    transition: all 0.3s;
    background: transparent;
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.accentPurple};
    }
  }
`;

const Stock = () => {
  let { id } = useParams();
  const [stockData, setStockData] = useState(null);
  const [stockQuoteData, setStockQuoteData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const lookupStock = (stock) => {
    const fetchData = async () => {
      try {
        setIsLoaded(true);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const selectedStock = symbols.filter(
      (stock) => stock.symbol === id.toUpperCase()
    )[0];
    setStockData(selectedStock);

    lookupStock(id);
  }, []);

  if (error) return <div>Error</div>;
  if (!isLoaded) return <div>...loading</div>;
  else {
    const percentageChange = (currentPrice, previousClose) => {
      return (((currentPrice - previousClose) / previousClose) * 100).toFixed(
        2
      );
    };
    const stockChange = percentageChange(stockQuoteData.c, stockQuoteData.pc);
    return (
      <StockStyles>
        {/* <StockLabel>
          {stockData && <h2>Stock: {stockData.symbol}</h2>}
        </StockLabel>

        <StockPrice>
          <h2>Price</h2>
          <div>
            <span className="text-dark price-label">Current:</span>{" "}
            <span id="current-price">${stockQuoteData.c}</span>
            <span
              className={
                "percentage-change" + (stockChange > 0 ? " gain" : " loss")
              }
            >
              &nbsp;({stockChange}%)
            </span>
          </div>
          <div>
            <span className="text-dark price-label">High:</span> $
            {stockQuoteData.h.toFixed(2)}
          </div>
          <div>
            <span className="text-dark price-label">Low:</span> $
            {stockQuoteData.l.toFixed(2)}
          </div>
          <div>
            <span className="text-dark price-label">Open:</span> $
            {stockQuoteData.o.toFixed(2)}
          </div>
        </StockPrice>
        <StockHoldings>
          <h2>Holdings</h2>
          <div id="holdings-details">
            <div>{stockData.symbol}</div>
            <div>$0.00</div>
            <div>0.00 shares</div>
            <button>Add {stockData.symbol}</button>
          </div>
        </StockHoldings> */}
      </StockStyles>
    );
  }
};
export default Stock;
