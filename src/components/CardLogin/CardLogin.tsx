import React, { useEffect, useState, useContext } from "react";
import styles from "./CardLogin.module.sass";
import { BiSolidUser } from "react-icons/bi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import LikensData from "../../utils/LikensData";
import { setUserDataType } from "./setDataUserType.type";
import Toast from "../Toast/Toast";
import { createPortal } from "react-dom";
import { ToastContext } from "../../context/ToastContext";

const CardLogin = ({ setUserData }: setUserDataType) => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [passwordType, setPasswordType] = useState("password");
  const { toastActive, setToastActive } = useContext(ToastContext);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastActive(false);
      setErro("");
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [toastActive]);

  return (
    <div className={styles.login}>
      <h3>
        Bem vindos ao <strong>Login</strong>
      </h3>

      <p>Preencha os dados do login para acessar</p>

      <div className={styles.usuario}>
        <label>Usuário</label>
        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <span>
          <BiSolidUser cursor="pointer" />
        </span>
      </div>

      <div className={styles.senha}>
        <label>Senha</label>
        <input
          type={passwordType}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          onClick={() =>
            passwordType === "password"
              ? setPasswordType("text")
              : setPasswordType("password")
          }
        >
          {passwordType === "password" ? (
            <AiFillEyeInvisible cursor="pointer" />
          ) : (
            <AiFillEye cursor="pointer" />
          )}
        </span>
      </div>

      <button
        onClick={() => {
          if (user === "") {
            setToastActive(true);
            setErro("Preencha os campos de usuário e senha");
          } else {
            setUserData(
              LikensData({ user, password, setToastActive, setErro })
            );
            setUser("");
            setPassword("");
          }
        }}
      >
        Entrar
      </button>
      {toastActive === true &&
        createPortal(
          <Toast barra={true} color="red">
            <strong className={styles.toastErro}> {erro} </strong>
          </Toast>,
          document.body
        )}
    </div>
  );
};

export default CardLogin;
