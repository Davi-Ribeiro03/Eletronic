import React, { useEffect, useState, useContext } from "react";
import styles from "./CardLogin.module.sass";
import { BiSolidUser } from "react-icons/bi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import LikensData from "../../utils/LikensData";
import { setUserDataType } from "./setDataUserType.type";
import Toast from "../Toast/Toast";
import { createPortal } from "react-dom";
import { ToastContext } from "../../context/ToastContext";
import { timeToast } from "../../utils/timeToast";
import Modal from "react-modal";

const root = document.querySelector("#root") as HTMLElement;
Modal.setAppElement(root);

const CardLogin = ({ setUserData }: setUserDataType) => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [passwordType, setPasswordType] = useState("password");
  const { toastActive, setToastActive } = useContext(ToastContext);
  const app = document.querySelector("#containerApp") as HTMLElement;

  useEffect(() => {
    const timeOut = timeToast({ setToastActive, setErro });

    return () => clearTimeout(timeOut);
  }, [toastActive]);

  return (
    <div className={styles.login}>
      <h3>
        Bem vindos ao <strong>Login</strong>
      </h3>

      <p data-testid="CardLoginAviso">
        Preencha os dados do login para acessar
      </p>

      <div className={styles.usuario}>
        <label>Usuário</label>
        <input
          data-testid="loginUser"
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <span>
          <BiSolidUser cursor="pointer" data-testid="usuario" />
        </span>
      </div>

      <div className={styles.senha}>
        <label>Senha</label>
        <input
          data-testid="loginPassword"
          type={passwordType}
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span
          data-testid="eye"
          onClick={() =>
            passwordType === "password"
              ? setPasswordType("text")
              : setPasswordType("password")
          }
        >
          {passwordType === "password" ? (
            <AiFillEyeInvisible cursor="pointer" data-testid="senhaEscondida" />
          ) : (
            <AiFillEye cursor="pointer" />
          )}
        </span>
      </div>

      <button
        data-testid="entrar"
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
            <strong className={styles.toastErro} data-testid="erroDeCampoVazio">
              {" "}
              {erro}{" "}
            </strong>
          </Toast>,
          app
        )}
    </div>
  );
};

export default CardLogin;
