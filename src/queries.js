import { gql } from "@apollo/client";

const GET_PORTFOLIO = gql`
  query GET_PORTFOLIO {
    portfolio {
      user
      stocks {
        symbol
        amount
      }
      cryptos {
        symbol
        amount
      }
      currencies {
        symbol
        amount
      }
    }
  }
`;

const GET_CURRENCIES = gql`
  query GET_CURRENCIES {
    portfolio {
      user
      currencies {
        symbol
        amount
      }
    }
  }
`;

export { GET_PORTFOLIO, GET_CURRENCIES };
