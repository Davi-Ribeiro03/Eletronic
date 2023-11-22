import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Products from "./Products";
import "@testing-library/jest-dom";
import { initialState } from "../../store/reducers/products";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import { FormProvider } from "../../context/FormContext";

describe("<Products/>", () => {
  it("Deve renderizar na tela, todos os produtos do estoque", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormProvider>
            <Products />
          </FormProvider>
        </BrowserRouter>
      </Provider>
    );

    const products = screen.getAllByTestId("products");

    expect(products).toHaveLength(initialState.length);
  });
  test("Deve ser possível remover um produto", () => {
    const removeProductFunction = jest.spyOn(
      require("../../store/reducers/products"),
      "removeProduct"
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormProvider>
            <Products />
          </FormProvider>
        </BrowserRouter>
      </Provider>
    );

    const removeProduct = screen.getAllByTestId("removeProduct");
    fireEvent.click(removeProduct[0]);

    expect(removeProductFunction).toHaveBeenCalled();
  });
  test("Deve ser possível abrir e fechar o modal de cadastrar produtos", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormProvider>
            <Products />
          </FormProvider>
        </BrowserRouter>
      </Provider>
    );

    const cadastrar = screen.getByTestId("cadastrar-produto");
    fireEvent.click(cadastrar);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    const closeModal = screen.getByTestId("closaModal");
    fireEvent.click(closeModal);
    expect(modal).not.toBeVisible();
  });
});
