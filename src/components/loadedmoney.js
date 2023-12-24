import React, { useCallback, useContext, useEffect, useState } from 'react'
import MessageInput from '../config/loaded';
import AppContext from './AppContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../css/auth.css'



export default function Loadedmoney() {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const navigate = useNavigate();
    const getloade = useCallback(async () => {
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
            const loade = response.data.data;
            dispatch({ type: "TRANSACTION", payload: loade });
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getloade();
    }, [getloade]);


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
                            Loade Money
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
