
import Header from "./components/Header";
import Login from "./components/login";
import Register from "./components/register";
import Loadedmoney from "./components/loadedmoney";
import Transaction from "./components/transaction";
import Withdrawmoney from "./components/withdrawmoney";
import Notification from "./components/notificationList";
import Home from "./components/home";

import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppReducer from './reducers/Appreducer'
import { useEffect, useReducer, useCallback } from "react";
import AppContext from "./components/AppContext";
import axios from "axios";


function App() {
  
  const initialState = { user: null, notification: [] }
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const checkCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "get",
        url: "/api/v1/auth/check",
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios(option);

      if (response.data.data.user) {
        const { userName } = response.data.data.user;
        dispatch({ type: "CURRENT_USER", payload: { userName } });
      };
    } catch (error) {
      console.log(error);
    };
  }, [dispatch]);
  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);

 
  return (
    <Router>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/gethome" element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/loadedmoney" element={<Loadedmoney />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/withdrawmoney" element={<Withdrawmoney />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
