const loginFormReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("email", action.email);
      localStorage.setItem("password", action.password);

      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return state;
  }
};

const loadingSpinnerReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        [action.field]: true,
      };
    default:
      return state;
  }
};

export { loginFormReducer, loadingSpinnerReducer };
