import { createContext, useContext, useReducer, useState } from "react";
import "./styles.css";

const CountContext = createContext();

const initialState = {
  count: 0,
  isNegative: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1, isNegative: false };
    case "decrement":
      return { ...state, count: state.count - 1, isNegative: state.count < 0 };

    default:
      return state;
  }
}

export default function App() {
  // const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleDarkMode() {
    // setIsDark(true);
    setIsDark((prevMode) => !prevMode);
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: isDark ? "darkgrey" : "white",
        color: isDark ? "black" : "black",
        minHeight: "100vh",
        transition: "all 1s ease",
      }}
    >
      <CountContext.Provider value={{ state, dispatch }}>
        <button className="btn-dark" onClick={handleDarkMode}>
          DarkMode
        </button>
        <div>
          <Box1 />
          <Box2 />
          <Box3 />
          <Box4 />
        </div>
      </CountContext.Provider>
    </div>
  );
}

function Box1() {
  // const { count, setCount } = useContext(CountContext);

  const { state, dispatch } = useContext(CountContext);
  const { count, isNegative } = state;
  // console.log(count, isNegative);

  return (
    <div className="box box1">
      <h1>Box 1: {count}</h1>
      <button className="btn" onClick={() => dispatch({ type: "increment" })}>
        +
      </button>

      {!isNegative ? (
        <button className="btn" onClick={() => dispatch({ type: "decrement" })}>
          -
        </button>
      ) : (
        <p>Count is getting negative </p>
      )}
    </div>
  );
}

function Box2() {
  // const { count, setCount } = useContext(CountContext);

  const { state, dispatch } = useContext(CountContext);
  const { count, isNegative } = state;
  // console.log(count, isNegative);

  return (
    <div className="box box2">
      <h1>Box 2: {count}</h1>
      <button className="btn" onClick={() => dispatch({ type: "increment" })}>
        +
      </button>

      {!isNegative ? (
        <button className="btn" onClick={() => dispatch({ type: "decrement" })}>
          -
        </button>
      ) : (
        <p>Count is getting negative </p>
      )}
    </div>
  );
}

function Box3() {
  // const { count, setCount } = useContext(CountContext);

  const { state, dispatch } = useContext(CountContext);
  const { count, isNegative } = state;
  // console.log(count, isNegative);

  return (
    <div className="box box3">
      <h1>Box 3: {count}</h1>
      <button className="btn" onClick={() => dispatch({ type: "increment" })}>
        +
      </button>

      {!isNegative ? (
        <button className="btn" onClick={() => dispatch({ type: "decrement" })}>
          -
        </button>
      ) : (
        <p>Count is getting negative </p>
      )}
    </div>
  );
}

function Box4() {
  // const { count, setCount } = useContext(CountContext);

  const { state, dispatch } = useContext(CountContext);
  const { count, isNegative } = state;
  // console.log(count, isNegative);

  return (
    <div className="box box4">
      <h1>Box 4: {count}</h1>
      <button className="btn" onClick={() => dispatch({ type: "increment" })}>
        +
      </button>

      {!isNegative ? (
        <button className="btn" onClick={() => dispatch({ type: "decrement" })}>
          -
        </button>
      ) : (
        <p>Count is getting negative </p>
      )}
    </div>
  );
}
