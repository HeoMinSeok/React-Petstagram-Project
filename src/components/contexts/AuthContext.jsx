import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const login = (username, password) => {
    // 목데이터
    if (username === "user" && password === "1234") {
        setLoggedInUserId(username);
    } else {
        throw new Error("잘못된 사용자 이름 또는 비밀번호입니다.");
    }
};

  const logout = () => {
    setLoggedInUserId(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
