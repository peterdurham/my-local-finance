import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { ContainerStyles } from "./styles/containerStyles";

const Portfolio = ({ auth, portfolio }) => {
  return (
    <ContainerStyles>
      <h1 className="fade-in-up">Portfolio go here</h1>
      <p>
        {auth.isAuthenticated ? (
          <span>Logged in as {auth.user.email}</span>
        ) : (
          <span>Not logged in</span>
        )}
      </p>
      <h2>Currencies</h2>
      {portfolio.currencies.map((currency) => (
        <div key={currency.symbol}>
          {currency.symbol} : {currency.amount}
        </div>
      ))}
    </ContainerStyles>
  );
};

export default Portfolio;
