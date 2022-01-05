export const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "GET_USER":
      console.log(state.user);
      return {
        ...state,
        user: action.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "USER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        currentUser: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        currentUser: null,
      };
    default:
      return state;
  }
};
