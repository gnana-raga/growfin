import React, { createContext, useReducer } from "react";
import data from "./data.json";

const initialState = {
  movies: data,
  searchTypes: [
    { value: "get:", label: "get" },
    { value: "rank:", label: "rank" },
  ],
  inputText: "",
  searchType: "get:",
  isQueryError: false,
  errorMessage: "",
};

export const getAllMovies = () => {
  return {
    type: "GET_ALL_MOVIES",
  };
};

export const getMovies = (payload) => {
  return {
    type: "GET_MOVIES",
    payload,
  };
};

export const setSearchType = (payload) => {
  return {
    type: "SET_SEARCH_TYPE",
    payload,
  };
};

export const setInputText = (payload) => {
  return {
    type: "SET_INPUT_TEXT",
    payload,
  };
};

export const setError = (payload) => {
  return {
    type: "ERROR_PARAMS",
    payload,
  };
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_MOVIES":
      return {
        ...state,
        movies: data,
        isQueryError: false,
        errorMessage: "",
      };
    case "GET_MOVIES":
      if (action.payload) {
        return {
          ...state,
          movies: action.payload,
        };
      } else {
        return {
          ...state,
          movies: data,
        };
      }
    case "SET_SEARCH_TYPE":
      return {
        ...state,
        searchType: action.payload,
        inputText: "",
      };
      break;
    case "SET_INPUT_TEXT":
      return {
        ...state,
        inputText: action.payload,
      };
      break;
    case "ERROR_PARAMS":
      return {
        ...state,
        isQueryError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
