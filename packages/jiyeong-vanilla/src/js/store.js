const createStore = (initialState = {}) => {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (newState) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener(structuredClone(state)));
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};

const initialState = {
  insertAmount: 0,
  balance: 0,
};

export const store = createStore(initialState);
