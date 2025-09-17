import React from 'react';
import './App.css';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function App() {
  const createStore = (reducer, initialState) => {
    const currentReducer = reducer;
    let state = initialState;
    let listener = undefined;

    return {
      dispatch(action) {
        state = currentReducer(state, action);
        if (listener) {
          listener();
        }
      },
      subscribe(newListener) {
        listener = newListener;
      },
      getState() {
        return state;
      }
    }
  };

  const counter = (state = 0, action) => {
    switch (action.type) {
      case INCREMENT:
        return state + 1;
      case DECREMENT:
        return state - 1;
      default:
        return state;
    }
  }

  const store = createStore(counter);

  store.subscribe(() => {
    console.log(`Change: ${store.getState()}`)
  });

  store.dispatch({type: INCREMENT});
  store.dispatch({type: INCREMENT});
  store.dispatch({type: INCREMENT});
  store.dispatch({type: INCREMENT});

  return (
    <div className="App">

    </div>
  );
}

export default App;
