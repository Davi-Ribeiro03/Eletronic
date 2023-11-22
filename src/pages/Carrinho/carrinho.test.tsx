import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Carrinho from "./Carrinho";
import mockcelular from "../../img/celular.png";
import mockfone from "../../img/fone.png";
import { initialState } from "../../store/reducers/products";
import { url } from "inspector";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import { removeAllOfTheCart } from "../../store/reducers/products";
import { ToastProvider } from "../../context/ToastContext";
import { timeToast } from "../../utils/timeToast";

let mockState = [
  {
    id: 1,
    name: "celular",
    image: "mockcelular",
    description: "Lorem ipsum dolor sit amet consectetur...",
    value: 2000,
    stock: 5,
    qtInCart: 1,
    productInCart: true,
  },
  {
    id: 2,
    name: "fone",
    image: "mockfone",
    description: "Lorem ipsum dolor sit amet consectetur...",
    value: 150,
    stock: 5,
    qtInCart: 1,
    productInCart: true,
  },
];

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => mockState,
}));

describe("<Carrinho/>", () => {
  test("Deve ser possivel comprar algum produto", () => {
    const removeInTheCart = jest.spyOn(
      require("../../store/reducers/products"),
      "removeAllOfTheCart"
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ToastProvider>
            <Carrinho />
          </ToastProvider>
        </BrowserRouter>
      </Provider>
    );

    const botaoComprar = screen.getByTestId("botaoComprar");
    fireEvent.click(botaoComprar);

    const compraRealizada = screen.getByText("Compra realizada com sucesso");

    expect(compraRealizada).toBeInTheDocument();
    expect(removeInTheCart).toHaveBeenCalled();

    removeInTheCart.mockRestore();
  });
  test("Ao realizar uma compra, deve ser chamado a função timeOut para tirar a visibilidade do toast depois de um tempo", () => {
    const timeToast = jest.spyOn(require("../../utils/timeToast"), "timeToast");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ToastProvider>
            <Carrinho />
          </ToastProvider>
        </BrowserRouter>
      </Provider>
    );

    const botaoComprar = screen.getByTestId("botaoComprar");
    fireEvent.click(botaoComprar);

    expect(timeToast).toHaveBeenCalled();

    timeToast.mockRestore();
  });
});
