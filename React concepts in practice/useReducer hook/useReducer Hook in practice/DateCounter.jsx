
function reducer(state, action) {
  console.log(
    `Initial state: ${state} | actionType: ${action.type} | actionPayload:${action.payload}`
  );

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count + state.step };

    case "inc":
      return { ...state, count: state.count - state.step };

    case "setCount":
      return { ...state, count: action.payload };

    case "setStep":
      return { ...state, step: action.payload };

    case "reset":
      return { step: 1, count: 0 };

    default:
      alert("Invalid operation to perform");
  }

  return state + action;
}

const initialState = { count: 0, step: 1 };
const [state, dispatch] = useReducer(reducer, initialState); //initialize useReducer with  initialstate variavles
const { count, step } = state;

//use dispatch to update the state changes
const dec = function () {
  // setCount((count) => count - 1);
  // setCount((count) => count - step);
  dispatch({ type: "inc" });
};
