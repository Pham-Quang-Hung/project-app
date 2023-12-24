import React, { useCallback, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import MessageInput from '../config/transfer';
import '../css/transfer.css';
import axios from 'axios';
import AppContext from './AppContext';
import { useNavigate } from 'react-router';

function App() {

  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const navigate = useNavigate();
  const gettrasfer = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "get",
        url: "/api/v1/views/transfer",
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios(option);
      const trasfer = response.data.data;
      dispatch({ type: "TRANSACTION", payload: trasfer });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    gettrasfer();
  }, [gettrasfer]);


  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      {user ? (
        socket ? (
          <>
            <header className="app-header">
              Transfer
            </header>
            <div className="chat-container">
              <MessageInput socket={socket} />
            </div>
          </>
        ) : (
          <div>Not Connected</div>
        )
      ) : (
        navigate('/')
      )}

    </div>
  );
}

export default App;