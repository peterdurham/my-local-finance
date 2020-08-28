import React, { useState } from "react";
import { ContainerStyles } from "../styles/containerStyles";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import isEmpty from "../../utils/is-empty";

const REGISTER_USER = gql`
  mutation REGISTER_USER($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      token
    }
  }
`;

const Signup = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted({ registerUser }) {
      localStorage.setItem("token", registerUser.token);
      const decoded = jwt_decode(registerUser.token);
      setAuth({
        user: decoded,
        isAuthenticated: !isEmpty(decoded),
      });
      history.push("/");
    },
    refetchQueries: [`GET_PORTFOLIO`],
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        variables: {
          email,
          password,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <ContainerStyles>
      <h1 className="fade-in-up">Signup go here</h1>

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
        <button type="submit">Register</button>
        {error && <div>{error.message}</div>}
      </form>
    </ContainerStyles>
  );
};

export default Signup;
