import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import symbols from "../../stockSymbols.json";

const StocksStyles = styled.div``;

const LookupStyles = styled.div`
  background: ${(props) => props.theme.themeMedium};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
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

const RecentStyles = styled.div`
  background: ${(props) => props.theme.themeMedium};
  padding: 16px;
  border-radius: 8px;
`;

const Stocks = ({ searchText, setSearchText, lookupStock }) => {
  const [filteredSymbols, setFilteredSymbols] = useState([]);

  useEffect(() => {
    return () => {
      setSearchText("");
    };
  }, []);

  const handleChange = (input) => {
    const newFiltered = symbols.filter((item) => {
      return (
        item.symbol.toLowerCase().startsWith(input.toLowerCase()) ||
        item.description.toLowerCase().startsWith(input.toLowerCase())
      );
    });
    setFilteredSymbols(newFiltered);
    setSearchText(input);
  };

  return (
    <StocksStyles>
      <LookupStyles>
        <h3 className="fade-in-up">Lookup Stocks</h3>

        <input
          type="text"
          id="search"
          placeholder="Search..."
          autoComplete="off"
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
        />
        {searchText.length > 0 && (
          <div id="dropdown">
            {filteredSymbols.map((item) => (
              <Link
                to={"/stocks/" + item.symbol.toLowerCase()}
                key={item.symbol}
              >
                <div className="dropdown-item">
                  <span className="dropdown-symbol">{item.symbol}</span>{" "}
                  <span className="dropdown-description">
                    {item.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </LookupStyles>
      <RecentStyles>
        <h3>Recent Searches</h3>
      </RecentStyles>
    </StocksStyles>
  );
};

export default Stocks;
