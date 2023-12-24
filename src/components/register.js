/* eslint-disable array-callback-return */
import React, { useContext, useState } from 'react'
import AppContext from './AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css'
export default function Register() {
    const { dispatch } = useContext(AppContext);
    //khởi tạo đối tượng với 4 thuộc tính
    const [userInput, SetUserInput] = useState({
        username: "",
        name: "",
        password: "",
        accountnumber: "",
    });
    //nhận dữ liệu từ from 
    const [errorMessage, SetErrorMessage] = useState(null);
    const navigate = useNavigate();
    //truyền dữ liệu vào cho userInput
    const onChageHandle = (e) => {
        SetUserInput({ ...userInput, [e.target.name]: e.target.value });
    }
    //thực hiện truyền tải dữ liệu lên cho server
    const onSubmitHandle = async (e) => {
        try {
            e.preventDefault();
            const option = {
                method: "post",
                url: "api/v1/auth/register",
                data: userInput,
            }
            const response = await axios(option);
            const { token } = response.data.data;
            localStorage.setItem("token", token);
            dispatch({ type: "CURRENT_USER", payload: null });
            navigate('/');
        } catch (error) {
            SetErrorMessage(error.response.data.message);
        }
    }
    return (
        <div>
            <section className="auth-container">
                <form className="auth-form" onSubmit={onSubmitHandle}>
                    <h2>Register New Account</h2>
                    {errorMessage && (Array.isArray(errorMessage) ? (
                        errorMessage.map((err) => {
                            <div className="error-message">Error: {err}</div>
                        })
                    ) : (<div className="error-message">Error: {errorMessage}</div>))}
                    <input type="text" name="username" required placeholder="Username" value={userInput.username}
                        onChange={onChageHandle} />

                    <input type="password" name="password" required placeholder="Password" value={userInput.password}
                        onChange={onChageHandle} />

                    <input type="text" name="name" required placeholder="Name" value={userInput.name}
                        onChange={onChageHandle} />

                    <input type="text" name="accountnumber" required placeholder="Account Number" value={userInput.accountnumber}
                        onChange={onChageHandle} />

                    <button className="btn" type="submit">Register</button>
                </form>
            </section>
        </div>
    )
}
