const reducer = (state, action) => {
  switch (action.type) {
    case "registered":
      return {
        isLoading: false,
        user: action.payload,
      };
      case "registeredfailed":
        return {
          isLoading: true,
          response: action.payload,
        };
    case "login":
      return {
        isLoading: false,
        user: action.payload,
      };
    case "loginfailed":
      return {
        isLoading: true,
        error: action.payload,
      };
    case "logout":
      return {
        user: action.payload,
      };
      case "delete":
        return {
          user: action.payload,
        };  
    case "update":
      return {
        user: action.payload,
      };
    case "posts":
      return {
        ...state,
        isLoading: false,
        totalposts: action.payload,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
export default reducer;
