import React from "react";
import styled from "styled-components";

const CryptoStyles = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
const CryptoLabel = styled.div`
  background: ${(props) => props.theme.themeLight};
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  grid-column: 1/3;
  margin-bottom: 16px;
`;

const CryptoDetails = styled.div`
  background: ${(props) => props.theme.themeLight};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  width: calc(100% - 8px);
  #crypto-details {
    display: flex;
  }
  #crypto-logo img {
    width: 80px;
    height: 80px;
    margin-right: 16px;
    align-item: flex-start;
    margin-top: 8px;
  }
  .details-label {
    color: ${(props) => props.theme.textDark};
    width: 89px;
    display: inline-block;
    text-align: right;
    margin-right: 8px;
  }
`;
const CryptoPrice = styled.div`
  background: ${(props) => props.theme.themeLight};
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
  width: calc(100% - 8px);
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

const CryptoHoldings = styled.div`
  background: ${(props) => props.theme.themeLight};
  padding: 16px;
  border-radius: 16px;
  grid-column: 1/3;
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

const Crypto = () => {
  return (
    <CryptoStyles>
      <CryptoLabel>
        <h2>Crypto</h2>
      </CryptoLabel>
      <CryptoDetails>
        <h2>Details</h2>
      </CryptoDetails>
      <CryptoPrice>
        <h2>Price</h2>
      </CryptoPrice>
      <CryptoHoldings>
        <h2>Holdings</h2>
        <div id="holdings-details">
          <div>ticker</div>
          <div>$0.00</div>
          <div>0.00 shares</div>
          <button>Add #ticker</button>
        </div>
      </CryptoHoldings>
    </CryptoStyles>
  );
};
export default Crypto;
