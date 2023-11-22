import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";

// let products = [
//   {
//     id: 1,
//     name: "celular",
//     image: "mockcelular",
//     description: "Lorem ipsum dolor sit amet consectetur...",
//     value: 2000,
//     stock: 5,
//     qtInCart: 1,
//     productInCart: true,
//   },
//   {
//     id: 2,
//     name: "fone",
//     image: "mockfone",
//     description: "Lorem ipsum dolor sit amet consectetur...",
//     value: 150,
//     stock: 5,
//     qtInCart: 1,
//     productInCart: true,
//   },
//   {
//     id: 3,
//     name: "notebook",
//     image: "notebook",
//     description: "Lorem ipsum dolor sit amet consectetur...",
//     value: 4500,
//     stock: 5,
//     qtInCart: 0,
//     productInCart: false,
//   },
// ];

// const userInfo = {
//   user: "Davi",
//   password: "1234",
//   role: "user",
// };

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useSelector: () => ({ userInfo, products }),
// }));
// jest.mock("../../components/Tabela/Tabela");

describe("Dashboard", () => {
  it("Deve renderizar o dashboard se o role do usuário for admin", () => {
    // const verificaRoleAdmin = jest.spyOn(
    //   require("../../utils/verificaRole"),
    //   "verificaRoleAdmin"
    // );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    // expect(verificaRoleAdmin).toHaveBeenCalled();
  });
});
