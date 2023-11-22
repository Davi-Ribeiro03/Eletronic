import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";
import { BrowserRouter, useLocation } from "react-router-dom";
import CartProvider from "../../context/CartContext";
import { Provider, useDispatch } from "react-redux";
import store from "../../store";
import AppRoutes from "../../routes/Router";
import { removeInStore } from "../../store/reducers/userInfo";

describe("<Navbar />", () => {
  test("Deve renderizar a Navbar corretamente", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const logo = screen.getByText("Logo");
    expect(logo).toBeInTheDocument();
  });

  test("Deve ser redirecionado para a página correta ao clicar nos links", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const products = screen.getAllByTestId("linkNavigate");

    expect(products).toHaveLength(4);
    for (const product of products) {
      if (product.textContent === "") {
        fireEvent.click(product);
        await waitFor(() =>
          // eslint-disable-next-line jest/no-conditional-expect
          expect(window.location.pathname).toBe(`/Carrinho`)
        );
      } else {
        fireEvent.click(product);
        await waitFor(() =>
          // eslint-disable-next-line jest/no-conditional-expect
          expect(window.location.pathname).toBe(`/${product.textContent}`)
        );
      }
    }
  });

  test("Deve retornar para o login quando clicar no logout", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const logout = screen.getByText("Logout");
    fireEvent.click(logout);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("Deve chamar a função removeInStore e removeItem do localStorage quando clicar no logout", async () => {
    // jest.spyOn(require("react-redux"), "useDispatch");
    // const mockDispatch = jest.fn();
    // useDispatch = () => mockDispatch;

    const removeStoreFunction = jest.spyOn(
      require("../../store/reducers/userInfo"),
      "removeInStore"
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const logout = screen.getByText("Logout");
    fireEvent.click(logout);

    await waitFor(() => {
      expect(removeStoreFunction).toHaveBeenCalled();
    });
  });
});
