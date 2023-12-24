
import React, { useCallback, useContext, useEffect, useState } from 'react'
import MessageInput from '../config/withdraw';
import AppContext from './AppContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../css/auth.css'



export default function Loadedmoney() {
    //data nhận từ server 
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const navigate = useNavigate();
    //yêu cầu data từ server
    const getWithdraw = useCallback(async () => {
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
        getWithdraw();
    }, [getWithdraw]);

    //kết nối socketio đến server
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
                            
                            Withdraw money
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
    )
}
