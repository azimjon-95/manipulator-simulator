import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, actions } from "./store/store";
import MainPanel from "./components/MainPanel";
import LoginCard from "./components/LoginCard";

const App: React.FC = () => {
  const auth = useSelector((state: RootState) => state.app.authenticated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth") === "true";
    if (storedAuth && !auth) {
      dispatch(actions.login({ username: "admin", password: "admin" }));
    }
  }, [auth, dispatch]);

  const authenticated = auth || localStorage.getItem("auth") === "true";

  return (
    <Routes>
      <Route path="/login" element={authenticated ? <Navigate to="/" /> : <LoginCard />} />
      <Route path="/" element={authenticated ? <MainPanel /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={authenticated ? "/" : "/login"} />} />
    </Routes>
  );
};

export default App;






