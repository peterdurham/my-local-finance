import React, { useState } from "react";
import { ContainerStyles } from "../styles/containerStyles";

import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import isEmpty from "../../utils/is-empty";
import { GET_PORTFOLIO } from "../../queries";

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }) {
      localStorage.setItem("token", loginUser.token);
      const decoded = jwt_decode(loginUser.token);
      setAuth({
        user: decoded,
        isAuthenticated: !isEmpty(decoded),
      });
      history.push("/");
    },
  });

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await loginUser({
        variables: { email, password },
        // update: (cache, { data: { loginUser } }) => {
        //   const data = cache.readQuery({ query: GET_PORTFOLIO });
        //   data.items = [...data.items, loginUser];
        //   cache.writeQuery({ query: GET_PORTFOLIO }, data);
        // },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <ContainerStyles>
      <h1 className="fade-in-up">Login go here</h1>
      <div>
        <h3>Login:</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
          {error && <div>{error.message}</div>}
        </form>
      </div>
    </ContainerStyles>
  );
};

export default Login;
