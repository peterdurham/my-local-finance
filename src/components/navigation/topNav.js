import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";

const routeLabels = [
  {
    pathname: "/",
    label: "Dashboard",
  },
  {
    pathname: "/portfolio",
    label: "Portfolio",
  },
  {
    pathname: "/settings",
    label: "Settings",
  },
  {
    pathname: "/stocks",
    label: "Stocks",
  },
  {
    pathname: "/cryptos",
    label: "Cryptos",
  },
  {
    pathname: "/currencies",
    label: "Currencies",
  },
  {
    pathname: "/signup",
    label: "Sign up",
  },
  {
    pathname: "/login",
    label: "Login",
  },
];

const TopNavStyles = styled.div`
  display: flex;
  background: ${(props) => props.theme.themeMedium};
  color: ${(props) => props.theme.textLight};
  grid-column: 1/3;
  grid-row: 1/2;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
  z-index: 5;

  #TopNav__left {
    width: 240px;
    padding-left: 16px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  #site-logo {
    display: flex;
    align-items: center;
    span {
      color: ${(props) => props.theme.textLight};
    }
    svg {
      font-size: 35px;
      color: ${(props) => props.theme.accentBlue};
      margin-right: 8px;
    }
  }

  #TopNav__right {
    width: calc(100% - 240px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;

    #TopNav__route {
      font-size: 20px;
      color: ${(props) => props.theme.textDark};
    }
    #TopNav__auth {
      display: flex;
    }
    #TopNav__signup {
      padding: 6px 14px;
      color: ${(props) => props.theme.textLight};
      border: 2px solid ${(props) => props.theme.accentBlue};
      border-radius: 24px;
      transition: all 0.3s;
      &:hover {
        background: ${(props) => props.theme.accentBlue};
      }
    }

    #TopNav__login {
      padding: 6px 14px;
      color: ${(props) => props.theme.textLight};
      background: ${(props) => props.theme.accentBlue};
      border-radius: 24px;
      margin-left: 14px;
    }

    #TopNav__logout {
      padding: 6px 14px;
      color: ${(props) => props.theme.textLight};
      background: ${(props) => props.theme.accentBlue};
      border-radius: 24px;
      margin-left: 14px;
      border: none;
      cursor: pointer;
    }
  }
`;

const TopNav = ({ auth, logoutUser }) => {
  const location = useLocation();

  const route = routeLabels.filter(
    (route) => route.pathname === location.pathname
  )[0];

  return (
    <TopNavStyles>
      <div id="TopNav__left">
        <Link to="/" id="site-logo">
          <GiTwoCoins />
          <span>My Local Finance</span>
        </Link>
      </div>
      <div id="TopNav__right">
        <div id="TopNav__route">{route && <span>{route.label}</span>}</div>

        <div id="TopNav__auth">
          <Link to="/signup" id="TopNav__signup">
            Sign up
          </Link>
          <Link to="/login" id="TopNav__login">
            Login
          </Link>
        </div>
      </div>
    </TopNavStyles>
  );
};

export default TopNav;
