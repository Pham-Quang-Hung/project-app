import React, { useCallback, useContext, useEffect } from 'react';
import '../css/home.css';
import axios from 'axios';
import AppContext from './AppContext';

export default function Home() {
    //dữ lệu nhận được từ server
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    //tạo 1 api yêu cầu dữ liệu từ server
    const gethome = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const option = {
                method: "get",
                url: "/api/v1/views/gethome",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };
            //kết nối đến server
            const response = await axios(option);
            //truy xuất dữ liệu nhận được
            const Loadedmoney = response.data.data;
            //gián data nhận được từ server
            dispatch({ type: "GET_HOME", payload: Loadedmoney });
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);
    useEffect(() => {
        gethome();
    }, [gethome]);

    return (
        <div>
            <div className="top-left">
                {user && (
                    <div className="account-info">
                        <h2>Thông Tin</h2>
                        <ul>
                            <li><strong>Số Dư: {user.accountnumber}</strong></li>
                            <li><strong>Số Tài Khoản: {user.money}</strong></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="top-center">
                {user && <div>{user.userName}</div>}
            </div>
        </div>
    );
}
