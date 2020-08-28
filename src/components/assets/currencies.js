import React, { useState } from "react";
import styled from "styled-components";
import { ContainerStyles } from "../styles/containerStyles";
import Currency from "./currency";
import Modal from "../ui/modal";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import isEmpty from "../../utils/is-empty";
import { currencyList } from "../data/currencyList";
import { GET_CURRENCIES } from "../../queries";

const ADD_ASSET = gql`
  mutation ADD_ASSET($type: String!, $symbol: String!, $amount: Float!) {
    addAsset(type: $type, symbol: $symbol, amount: $amount) {
      currencies {
        symbol
        amount
      }
    }
  }
`;

const UPDATE_ASSET = gql`
  mutation UPDATE_ASSET($type: String!, $symbol: String!, $amount: Float!) {
    updateAsset(type: $type, symbol: $symbol, amount: $amount) {
      currencies {
        symbol
        amount
      }
    }
  }
`;

const Currencies = ({ auth, portfolioLoading }) => {
  const [showModal, setShowModal] = useState(false);

  const [currencyToAdd, setCurrencyToAdd] = useState(null);
  const [addAmount, setAddAmount] = useState("");
  const [adding, setAdding] = useState(false);

  const [currencyToUpdate, setCurrencyToUpdate] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(null);
  const [updateAmount, setUpdateAmount] = useState("");
  const [updating, setUpdating] = useState(false);

  const { data, loading, error } = useQuery(GET_CURRENCIES, {
    skip: !auth.isAuthenticated,
  });
  console.log(data);
  const [addAsset, { loading: loadingAdd, error: errorAdd }] = useMutation(
    ADD_ASSET,
    {
      refetchQueries: [`GET_CURRENCIES`],
    }
  );

  const [
    updateAsset,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_ASSET, {
    refetchQueries: [`GET_CURRENCIES`],
  });

  const submitAddAsset = async (e) => {
    try {
      e.preventDefault();

      await addAsset({
        variables: {
          type: "currency",
          symbol: currencyToAdd,
          amount: Number(addAmount),
        },
      });
      setAddAmount("");
      setAdding(false);
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };
  const submitUpdateAsset = async (e) => {
    try {
      e.preventDefault();

      await updateAsset({
        variables: {
          type: "currency",
          symbol: currencyToUpdate,
          amount: Number(updateAmount),
        },
      });
      setUpdateAmount("");
      setUpdating(false);
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {adding && (
          <>
            <p>Add {currencyToAdd}</p>
            <form onSubmit={submitAddAsset}>
              <label htmlFor="amount">Amount:</label>
              <input
                id="amount"
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
              />
              <button>Add {currencyToAdd}</button>
            </form>
          </>
        )}
        {updating && (
          <>
            <p>Update {currencyToUpdate}</p>
            <p>Current Amount: {currentAmount}</p>
            <form onSubmit={submitUpdateAsset}>
              <label htmlFor="updateamount">New Amount:</label>
              <input
                id="updateamount"
                type="number"
                value={updateAmount}
                onChange={(e) => setUpdateAmount(e.target.value)}
              />
              <button>Update {currencyToUpdate}</button>
            </form>
          </>
        )}
      </Modal>
      <ContainerStyles>
        <h1 className="fade-in-up">Currencies go here</h1>
      </ContainerStyles>
      <ContainerStyles>
        <div>
          {currencyList.map((currency) => {
            const assetOwned = data.portfolio.currencies.filter(
              (item) => item.symbol === currency.symbol
            )[0];
            const amount = assetOwned ? assetOwned.amount : 0;

            return (
              <Currency
                key={currency.symbol}
                image={currency.image}
                symbol={currency.symbol}
                name={currency.name}
                auth={auth}
                setShowModal={setShowModal}
                setCurrencyToAdd={setCurrencyToAdd}
                setAdding={setAdding}
                setCurrencyToUpdate={setCurrencyToUpdate}
                setCurrentAmount={setCurrentAmount}
                setUpdating={setUpdating}
                amount={amount}
              />
            );
          })}
        </div>
      </ContainerStyles>
    </>
  );
};

export default Currencies;
