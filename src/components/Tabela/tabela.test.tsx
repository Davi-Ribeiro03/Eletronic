import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tabela from "./Tabela";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../store";
import {
  changeProductInCart,
  addProductInCart,
} from "../../store/reducers/products";
import { ProductsInfo } from "./Tabela";
import { initialState } from "../../store/reducers/products";

describe("<Tabela/>", () => {
  test("Deve renderizar o componente <Tabela/>", () => {
    render(
      <Provider store={store}>
        <Tabela />
      </Provider>
    );

    const aparelho = screen.getByText("Aparelho");
    const estoque = screen.getByText("Estoque");
    const valor = screen.getByText("Valor");

    expect(aparelho).toBeInTheDocument();
    expect(estoque).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
  });

  test("A tabela deve ter o tamanho de linhas proporcional a quantidade de produtos disponíveis", () => {
    const produtosDisponiveis = initialState.length;

    render(
      <Provider store={store}>
        <Tabela />
      </Provider>
    );

    const linhasTabela = screen.getAllByTestId("linhasTabela");

    expect(linhasTabela).toHaveLength(produtosDisponiveis);
  });
});
