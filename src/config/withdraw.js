import React, { useEffect, useState } from 'react';
//import '../css/transfer.css';
import { useNavigate } from 'react-router';

export default function Withdraw({ socket }) {
    const navigate = useNavigate();
    //take token from the localStorage
    const token = localStorage.getItem('token');
    const [value, setValue] = useState({
        token: '',
        amount: '',
        password: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue((prevaData) => ({
            ...prevaData,
            [name]: value,
        }));
    };
    const submitForm = (e) => {
        e.preventDefault();
        const updatedValue = { ...value, token: `bearer ${token}` };
        socket.emit('withdraw', updatedValue);
    };
    useEffect(() => {
        //sucessfully
        const handleSuccess = () => {
            alert('bạn đã tạo mã  thành công...');
            navigate('/gethome');
        };
        //error
        const handleFailed = (data) => {
            alert(data);
        }
        //message from the server
        socket.on('withdraw-sucessfully', handleSuccess);
        socket.on('withdraw-failed', handleFailed);

        return () => {
            // Clean up the event listener when the component unmounts
            socket.off('withdraw-sucessfully', handleSuccess);
            socket.off('withdraw-failed', handleFailed);
        };
    }, [socket, navigate]);
    return (
        <section class="auth-container">
            <form class="auth-form" onSubmit={submitForm}>
                <h2>Withdraw money</h2>
                <div id="error-message" class="error-message"></div>
                <label for="amount">Số Tiền:</label>
                <label htmlFor="amount">Số tiền:</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="1"
                    value={value.amount}
                    onChange={handleChange}
                    required
                />

                <label for="accountnumber">Mật Khẩu:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Nhập số mật khẩu"
                    required
                    value={value.password}
                    onChange={handleChange}
                />

                <button type="submit">Rút Tiền</button>
            </form>
        </section>
    )
}
