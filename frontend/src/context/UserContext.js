import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
  const {
    authenticated,
    register,
    logout,
    login,
    forgotpassword,
    resetpassword,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        authenticated,
        register,
        logout,
        login,
        forgotpassword,
        resetpassword,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
