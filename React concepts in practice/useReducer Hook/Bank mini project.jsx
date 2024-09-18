//Bank app using useReducer hook
// import "./styles.css";

function reducer(state, action) {
  console.log(state, "|", action);

  switch (action.type) {
    case "openAcc":
      return { ...state, isActive: true, message: "Welcome to our bank" };

    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        message: `You deposited ${action.payload} amount`,
      };

    case "withdraw":
      if (state.balance < 50)
        return { ...state, message: "Not enough Money in you account" };
      return {
        ...state,
        balance: state.balance - action.payload,
        message: `You withdraw ${action.payload} amount`,
      };

    case "reqLoan":
      if (!state.loan === 0) return;

      if (state.loan >= 5000)
        return {
          ...state,
          message: "Cannot grant the loan amount, clear the current loan first",
        };
      return {
        ...state,
        balance: state.balance + state.loan + action.payload,
        loan: state.loan + action.payload,
        message: `You requested loan of ${action.payload} amount`,
      };

    case "payLoan":
      if (state.loan === 0)
        return { ...state, message: "No loan is there currently" };
      return {
        ...state,
        loan: Math.abs(state.loan - action.payload),
        balance: Math.abs(state.balance - action.payload),
        message: `You payed back the loan of ${action.payload} amount`,
      };

    case "closeAcc":
      if (state.loan === 0)
        return {
          balance: 0,
          loan: 0,
          isActive: false,
          message: "Bye 👋",
        };
      else {
        return {
          ...state,
          message: `Pay back the loan first, then close the account`,
        };
      }
  }
}
const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  message: "",
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { balance, loan, isActive, message } = state;

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <h3 style={{ color: "violet" }}>Message by bank: {message}</h3>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAcc" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "reqLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan", payload: 1000 });
          }}
          disabled={!isActive}
        >
          Pay loan of 1000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAcc" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
