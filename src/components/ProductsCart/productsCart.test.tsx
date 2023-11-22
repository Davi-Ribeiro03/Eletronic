import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductsCart from "./ProductsCart";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { changeProductInCart } from "../../store/reducers/products";

// jest.mock("array.prototype.some");
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
  {
    id: 3,
    name: "notebook",
    image: "notebook",
    description: "Lorem ipsum dolor sit amet consectetur...",
    value: 4500,
    stock: 5,
    qtInCart: 0,
    productInCart: false,
  },
];

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => mockState,
}));

describe("<ProductsCart/>", () => {
  test("Deve renderizar o componente <ProductsCart/> ", () => {
    render(
      <Provider store={store}>
        <ProductsCart />
      </Provider>
    );

    const produto = screen.getByText("Produto");

    expect(produto).toBeInTheDocument();
  });

  test("Deve renderizar o valor total quando tiver produto no carrinho", () => {
    render(
      <Provider store={store}>
        <ProductsCart />
      </Provider>
    );

    const valorTotal = screen.getByTestId("valor_total");

    expect(valorTotal).toBeVisible();
  });

  test("Deve chamar a função que aumenta a quantidade de produtos no carrinho ao clicar no botão de aumentar", () => {
    const addProductInCart = jest.spyOn(
      require("../../store/reducers/products"),
      "addProductInCart"
    );

    render(
      <Provider store={store}>
        <ProductsCart />
      </Provider>
    );

    const aumentaQtd = screen.getAllByTestId("aumenta_qtd");
    fireEvent.click(aumentaQtd[0]);

    expect(addProductInCart).toHaveBeenCalled();
  });

  test("Deve diminuir a quantidade de produtos ao clicar em no botão de aumentar", () => {
    const mockSome = () => false;
    Array.prototype.some = mockSome;

    render(
      <Provider store={store}>
        <ProductsCart />
      </Provider>
    );

    const carrinhoVazio = screen.getByTestId("carrinho_vazio");

    expect(carrinhoVazio).toBeVisible();
  });
});
