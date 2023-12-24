import React, { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from './AppContext';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css'
export default function Login() {
    const { dispatch } = useContext(AppContext);
    //khởi tạo thuộc tính với hai giá trị 
    const [userInput, SetUserInput] = useState({ username: "", password: "" });
    const [errorMessage, SetErrorMessage] = useState(null);
    const navigate = useNavigate();
    //lấy dữ liệu từ from
    const onChageHandle = (e) => {
        SetUserInput({ ...userInput, [e.target.name]: e.target.value });
    }
    //truyền lải dữ liệu lên server
    const onSubmitHandle = async (e) => {
        try {
            e.preventDefault();
            //api login
            const option = {
                method: "post",
                url: "api/v1/auth/login",
                data: userInput,
            }
            const response = await axios(option);
            const { token, userName } = response.data.data;
            //thêm giá trị vào trng localStorage
            localStorage.setItem("token", token);
            //cập nhận trạng thái người dùng
            dispatch({ type: "CURRENT_USER", payload: { userName } });
            navigate('/gethome');
        } catch (error) {
            SetErrorMessage(error.response.data.message);
        }
    }
        ; return (
            <div>
                <section class="auth-container">
                    <form class="auth-form" onSubmit={onSubmitHandle}>
                        <h2>Enter Your Account</h2>
                        {errorMessage && (
                            <div className='error-message'>Error: {errorMessage}</div>
                        )}
                        <input type="text" name="username" value={userInput.username} required placeholder="username"
                            onChange={onChageHandle} />
                        <input type="password" name="password" id="" value={userInput.password} required placeholder="password"
                            onChange={onChageHandle} />
                        <button class="btn" type="submit">Login</button>
                    </form>
                </section>
            </div>
        )
}
