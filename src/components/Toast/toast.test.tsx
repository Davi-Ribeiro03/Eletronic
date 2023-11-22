import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toast from "./Toast";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../store";
import {
  changeProductInCart,
  addProductInCart,
} from "../../store/reducers/products";
import { initialState } from "../../store/reducers/products";

describe("<Toas/>", () => {
  test("Deve renderizar o toast com a mensagem passada como parâmetro", () => {
    render(
      <Provider store={store}>
        <Toast barra={false} color="green">
          Hello
        </Toast>
      </Provider>
    );

    const mensagem = screen.getByText("Hello");

    expect(mensagem).toBeInTheDocument();
  });

  test("Deve renderizar a barra de contagem no toast", () => {
    render(
      <Provider store={store}>
        <Toast barra={true} color="green">
          Hello
        </Toast>
      </Provider>
    );

    const toastBarra = screen.getByTestId("toastBarra");

    expect(toastBarra).toBeInTheDocument();
  });
});
