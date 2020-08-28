import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_PORTFOLIO = gql`
  mutation ADD_PORTFOLIO {
    addPortfolio {
      user
    }
  }
`;

const GET_TODOS = gql`
  query GET_TODOS {
    todos {
      id
      email
      text
    }
  }
`;

const TodoList = ({ auth }) => {
  const [todo, setTodo] = useState("");

  const {
    data: todosData,
    error: todosError,
    loading: todosLoading,
  } = useQuery(GET_TODOS);

  const [addPortfolio, { loading, error }] = useMutation(ADD_PORTFOLIO);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPortfolio();
    } catch (e) {
      console.error(e);
    }
  };
  if (todosLoading) return "Loading...";
  if (todosError) return `Error! ${todosError.message}`;

  return (
    <div>
      <h1>Todo List</h1>
      <p>
        User:{" "}
        {auth.isAuthenticated ? (
          <span>{auth.user.email}</span>
        ) : (
          <span>none, please log in</span>
        )}
      </p>
      <form onSubmit={onSubmit}>
        <label htmlFor="todo">Todo: </label>
        <input
          type="text"
          id="todo"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      <div>
        <h2>Todos:</h2>
        {todosData.todos.map((todo) => {
          return <div key={todo.id}>{todo.text}</div>;
        })}
      </div>
    </div>
  );
};
export default TodoList;
