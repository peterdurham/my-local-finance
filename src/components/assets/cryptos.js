import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ContainerStyles } from "../styles/containerStyles";

const LookupStyles = styled.div`
  h3 {
    margin-bottom: 16px;
  }
  input {
    background: ${(props) => props.theme.input};
    color: ${(props) => props.theme.textLight};
    border: none;
    height: 32px;
    font-size: 14px;
    padding-left: 16px;
    width: 420px;
  }
  input:active,
  input:focus {
    outline: 1px solid ${(props) => props.theme.textDark};
  }
  #dropdown {
    margin-top: 1px;
    padding: 8px 16px;
    width: 420px;
    max-height: 254px;
    overflow-y: scroll;
    background: ${(props) => props.theme.themeLight};
  }
  .dropdown-item {
    color: ${(props) => props.theme.textDark};
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.input};
    }
  }
  .dropdown-symbol {
    color: ${(props) => props.theme.textLight};
    width: 64px;
    display: inline-block;
  }
  .dropdown-description {
  }
`;

const Cryptos = ({ searchText, setSearchText, lookupCrypto }) => {
  return (
    <>
      <ContainerStyles>
        <LookupStyles>
          <h3 className="fade-in-up">Lookup Cryptos</h3>

          <input
            type="text"
            id="search"
            placeholder="Search..."
            autoComplete="off"
            value={searchText}
          />
          <button onClick={() => lookupCrypto()}>Search</button>
        </LookupStyles>
      </ContainerStyles>
      <ContainerStyles>
        <h3>Recent Searches</h3>
      </ContainerStyles>
    </>
  );
};

export default Cryptos;
