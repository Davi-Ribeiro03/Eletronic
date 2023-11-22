import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserDataType } from "../../types/UserDataType";

const ErrorPage = () => {
  const userInfo = useSelector(
    (state: { userInfo: UserDataType }) => state.userInfo
  );
  const navigate = useNavigate();

  console.log(userInfo);

  return (
    <div>
      <h1>Usuário não autorizado</h1>

      <button
        onClick={() => {
          navigate("/Home");
        }}
      >
        Voltar
      </button>
    </div>
  );
};

export default ErrorPage;
