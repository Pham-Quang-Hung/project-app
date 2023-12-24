import React, { useEffect, useState } from 'react';
import '../css/m2.css';
import { useNavigate } from 'react-router';



export default function Transfer({ socket }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [value, setValue] = useState({
    token: '',
    recipient: '',
    bankAccount: '',
    amount: '',
    note: '',
  });
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
    socket.emit('transfer', updatedValue);
  };


  useEffect(() => {
    const handleSuccess = () => {
      alert('thanh cong');
      navigate('/gethome');
    };
    const handleFailed = (data) => {
      alert(data);
    }

    socket.on('serversend-sucessfully', handleSuccess);
    socket.on('accountnumber-failed', handleFailed);


    return () => {
      // Clean up the event listener when the component unmounts
      socket.off('serversend-sucessfully', handleSuccess);
      socket.off('accountnumber-failed', handleFailed);

    };
  }, [socket, navigate]);


  return (
    <form onSubmit={submitForm}>
      <label htmlFor="recipient">Người nhận:</label>

      <input
        type="text"
        id="recipient"
        name="recipient"
        value={value.recipient}
        onChange={handleChange}
        required
      />

      <label htmlFor="bankAccount">Số tài khoản ngân hàng:</label>
      <input
        type="text"
        id="bankAccount"
        name="bankAccount"
        value={value.bankAccount}
        onChange={handleChange}
        required
      />

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

      <label htmlFor="note">Ghi chú:</label>
      <input
        type="text"
        id="note"
        name="note"
        rows="4"
        value={value.note}
        onChange={handleChange}
      />

      <button type="submit">Chuyển tiền</button>
    </form>
  );
};


