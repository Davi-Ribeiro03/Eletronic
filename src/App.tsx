import React, { useState, useEffect } from "react";
import CardLogin from "./components/CardLogin/CardLogin";
import styles from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addInStore } from "./store/reducers/userInfo";
import { UserDataType } from "./types/UserDataType";
import bolha from "./img/bolha.png";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const [userData, setUserData] = useState<UserDataType>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.user !== undefined) {
      const userDataJson = JSON.stringify(userData);
      localStorage.setItem("userDataJson", userDataJson);
      dispatch(addInStore(userData));
      userData?.role === "admin" && navigate("/Dashboard");
      userData?.role === "user" && navigate("/Home");
    }
  }, [userData]);

  return (
    <div className={styles.containerApp} id="containerApp">
      <div className={styles.login}>
        <ToastProvider>
          <CardLogin setUserData={setUserData} />
        </ToastProvider>
      </div>
      {/* <img src={bolha} className={styles.bolha} /> */}
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
