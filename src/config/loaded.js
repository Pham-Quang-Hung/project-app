import React, { useEffect, useState } from 'react';
import '../css/m2.css';
import { useNavigate } from 'react-router';

export default function Loaded({ socket }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [value, setValue] = useState({
        token: "",
        password: "",
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const submitForm = (e) => {
        e.preventDefault();
        const updatedValue = { ...value, token: `bearer ${token}` };
        socket.emit('loade', updatedValue);
    };
    useEffect(() => {
        const handleSuccess = () => {
            alert('sucessfully...');
            navigate('/gethome');
        }

        const handleFailed = () => {
            alert("failed...");
        }

        socket.on('loade-sucessfully', handleSuccess);
        socket.on('loade-failed', handleFailed);
        return () => {
            socket.off('loade-sucessfully', handleSuccess);
            socket.off('loade-failed', handleFailed);
        }

    }, [socket, navigate]);
    return (
        <div>
            <section class="auth-container">
                <form class="auth-form" onSubmit={submitForm}>
                    <h2>Nạp Tiền</h2>
                    <div id="error-message" class="error-message"></div>
                    <label for="accountnumber">Mật Khẩu:</label>
                    <input type="password" id="password" name="password" placeholder="Nhập số mật khẩu" required value={value.password} onChange={handleChange} />
                    <button type="submit">Nạp Tiền</button>
                </form>
            </section>
        </div>
    )

}

