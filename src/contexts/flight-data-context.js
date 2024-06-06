import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

const HANDLERS = {
  GET_FLIGHT: 'GET_FLIGHT',
  SET_FLIGHT: 'SET_FLIGHT',
  // SET_LOADING: 'SET_LOADING',
  // SET_ERROR: 'SET_ERROR'
};

const initialState = {
  flight: null,
  // isLoading: true,
  // error: null
};

const handlers = {
  [HANDLERS.GET_FLIGHT]: (state, action) => {
    return {
      ...state,
      // isLoading: true,
      // error: null
    };
  },
  [HANDLERS.SET_FLIGHT]: (state, action) => {
    const flight = action.payload;

    return {
      ...state,
      // isLoading: false,
      flight
    };
  },
  // [HANDLERS.SET_LOADING]: (state, action) => {
  //   const isLoading = action.payload;

  //   return {
  //     ...state,
  //     isLoading
  //   };
  // },
  // [HANDLERS.SET_ERROR]: (state, action) => {
  //   const error = action.payload;

  //   return {
  //     ...state,
  //     isLoading: false,
  //     error
  //   };
  // }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate flight data through the App tree.

export const FlightDataContext = createContext({ undefined });

export const FlightDataProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  // const isFlightProvided = useRef(false);

  const getFlightData = async () => {
    dispatch({ type: HANDLERS.GET_FLIGHT });
  };

  const setFlightData = (flight) => {
    dispatch({ type: HANDLERS.SET_FLIGHT, payload: flight });
  };

  return (
    <FlightDataContext.Provider
      value={{
        ...state,
        getFlightData,
        setFlightData
      }}
    >
      {children}
    </FlightDataContext.Provider>
  );
};

FlightDataProvider.propTypes = {
  children: PropTypes.node
};

export const FlightDataConsumer = FlightDataContext.Consumer;

export const useFlightDataContext = () => useContext(FlightDataContext);