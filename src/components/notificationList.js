import React, { useCallback, useContext, useEffect } from 'react';
import '../css/notification.css';
import axios from 'axios';
import AppContext from './AppContext';


export default function NotificationList() {
  //data nhận được từ server
  const { state, dispatch } = useContext(AppContext);
  const { notification } = state;
  //api để gửi yêu cầu lấy dữ liệu từ server
  const getnotification = useCallback(async () => {
    try {
      //lấy token
      const token = localStorage.getItem("token");
      const option = {
        method: "get",
        url: "/api/v1/views/notification",
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const response = await axios(option);
      const notifications = response.data.data.notification;
      //napj dữ liệu lại cho client 
      dispatch({ type: "NOTIFICATION", payload: notifications });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getnotification();
  }, [getnotification]);
  return (
    <div>
      <section className="notification-section">
        <div className="notification-list">
          {notification && notification.map((notificationItem) => (
            <div key={notificationItem.id}>
              {(notificationItem.transaction)?(<p className="notification-content">Transaction: {notificationItem.transaction}</p>):(null)}
              {(notificationItem.code)?(<p className="notification-content">Code: {notificationItem.code}</p>):(null)}
              {(notificationItem.money)?(<p className="notification-content">Money: {notificationItem.money}</p>):(null)}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
