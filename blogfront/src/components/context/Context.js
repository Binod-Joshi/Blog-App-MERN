import { createContext, useContext, useReducer, useState } from "react";
import reducer from "./Reducer";

export const Context = createContext();

export const ContextPro = ({ children }) => {
  const [timeoutsId, setTimeoutsId] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user")); //The ContextPro component runs every time the UseGlobalContext component is used to access the context values.
  const [showPopUp, setShowPopUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [comments,setcomments] = useState([]);

  const initialState = {
    isLoading: true,
    user: storedUser || null,
    totalposts: [],
    error: "",
    response:"",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveUser = async (user) => {
    return new Promise((resolve, reject) => {
        localStorage.setItem("user", JSON.stringify(user));
        resolve();
      });
  };

  const registerClicked = async ({ navigate, username, email, password }) => {
    setLogin(true);
    let user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
      method: "post",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    user = await user.json();
    if (user._id) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "registered", payload: user });
      navigate("/");
      setLogin(false);
    } else {
      dispatch({ type: "registeredfailed", payload: user.result });
      setLogin(false);
      const timeout = setTimeout(() => {
        setTimeoutsId("");
        dispatch({ type: "registeredfailed", payload: "" });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  };

  const loginClicked = async ({ navigate, e, username, password }) => {
    e.preventDefault();
    setLogin(true);
    let user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    user = await user.json();
    if (user?._id) {
      await saveUser(user);
      dispatch({ type: "login", payload: user });
      navigate("/");
      setLogin(false);
    } else {
      dispatch({ type: "loginfailed", payload: user.result });
      setLogin(false);
      if (timeoutsId) {
        clearTimeout(timeoutsId); // clear the previous timeout if it exists
      }
      const newTimeoutId = setTimeout(() => {
        setTimeoutsId("");
        dispatch({ type: "loginfailed", payload: "" });
      }, 5000);
      setTimeoutsId(newTimeoutId);
    }
  };

  //logout
  const logouts = () => {
    let currentuser = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: "logout", payload: currentuser });
  };

  const deleteUser = () => {
    let currentuser = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: "logout", payload: currentuser });
  };

  //update user
  const updatehandler = async ({
    navigate,
    id,
    username,
    email,
    password,
    profilePic,
  }) => {
    const fields = password
      ? { username, email, password, profilePic }
      : { username, email, profilePic };
    let user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
      method: "put",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    user = await user.json();
    if (user._id) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "update", payload: user });
      navigate("/");
    }
  };

  //get total posts
  const getTotalPost = async () => {
    dispatch({ type: "loading" });
    let allposts = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "get",
    });
    allposts = await allposts.json();
    dispatch({ type: "posts", payload: allposts });
    
  };

  const updateTotalPosts = async (updatedPost) => {
    dispatch({type:"posts",payload:updatedPost})
  }

  return (
    <div>
      <Context.Provider
        value={{
          ...state,
          loginClicked,
          registerClicked,
          logouts,
          deleteUser,
          updatehandler,
          showPopUp,
          setShowPopUp,
          getTotalPost,
          login,
          updateTotalPosts,
          comments,
          setcomments
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};

export const UseGlobalContext = () => {
  return useContext(Context);
};
