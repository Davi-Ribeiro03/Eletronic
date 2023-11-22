import registeredUsers from "./registeredUsers";
import { LoginData } from "../types/LoginData.type";
import { UserDataType } from "../types/UserDataType";

export default function LikensData({
  user,
  password,
  setToastActive,
  setErro,
}: LoginData) {
  const informesDataUser = registeredUsers.find(
    (registeredUser) =>
      registeredUser.user === user && registeredUser.password === password
  );

  if (informesDataUser === undefined) {
    setToastActive(true);
    setErro("Usuário ou senha incorretos");
  }

  return informesDataUser;
}
