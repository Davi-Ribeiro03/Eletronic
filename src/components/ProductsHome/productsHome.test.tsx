import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductsHome from "./ProductsHome";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../../store";
import {
  changeProductInCart,
  addProductInCart,
} from "../../store/reducers/products";
import { initialState } from "../../store/reducers/products";
import mockcelular from "../../img/celular.png";
import mockfone from "../../img/fone.png";

describe("<ProductsHome/>", () => {
  test("Deve renderizar o componente <ProductsHome/>", () => {
    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const description = screen.getAllByTestId("description");
    expect(description[0]).toBeInTheDocument();
  });

  test("Deve chamar a função que adiciona o produto no carrinho ao clicar no carrinho", () => {
    //A função de baixo muda o estado informando que o produto está no carrinho
    const adicionaNoCarrinho = jest.spyOn(
      require("../../store/reducers/products"),
      "changeProductInCart"
    );

    // A função abaixo adiciona de fato 1 quantidade do produto
    const adicionaProdutoNoCarrinho = jest.spyOn(
      require("../../store/reducers/products"),
      "addProductInCart"
    );
    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const botaoCarrinho = screen.getAllByTestId("adicionaNoCarrinho");

    fireEvent.click(botaoCarrinho[0]);

    expect(adicionaNoCarrinho).toHaveBeenCalled();
    expect(adicionaProdutoNoCarrinho).toHaveBeenCalled();

    adicionaNoCarrinho.mockRestore();
    adicionaProdutoNoCarrinho.mockRestore();

    //Para tirar novamente do carrinho
    const botaoTirarDoCarrinho = screen.getByTestId("tiraDoCarrinho");
    fireEvent.click(botaoTirarDoCarrinho);
  });

  test("Deve chamar a função que remove o produto do carrinho ao clicar no carrinho", () => {
    const tiraDoCarrinho = jest.spyOn(
      require("../../store/reducers/products"),
      "changeProductInCart"
    );
    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const botaoCarrinho = screen.getAllByTestId("adicionaNoCarrinho");
    fireEvent.click(botaoCarrinho[0]);

    const botaoTirarDoCarrinho = screen.getByTestId("tiraDoCarrinho");
    fireEvent.click(botaoTirarDoCarrinho);

    expect(tiraDoCarrinho).toHaveBeenCalled();

    tiraDoCarrinho.mockRestore();
  });

  test("Deve renderizar o toast quando clicar na opção de colocar o produto no carrinho", () => {
    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const botaoCarrinho = screen.getAllByTestId("adicionaNoCarrinho");
    fireEvent.click(botaoCarrinho[0]);

    const toast = screen.getByTestId("toastProductQtd");

    expect(toast).toBeInTheDocument();

    //Para tirar novamente do carrinho
    const botaoTirarDoCarrinho = screen.getByTestId("tiraDoCarrinho");
    fireEvent.click(botaoTirarDoCarrinho);
  });

  test("Ao clicar no botão de aumentar quantidade, no toast, a quantidade deve realmente aumentar e não deve passar da quantidade que tem no estoque", () => {
    const adicionaProdutoNoCarrinho = jest.spyOn(
      require("../../store/reducers/products"),
      "addProductInCart"
    );

    const qtdNoEstoque = 5;

    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const botaoCarrinho = screen.getAllByTestId("adicionaNoCarrinho");
    fireEvent.click(botaoCarrinho[0]);

    const botaoAumentaQtd = screen.getByTestId("aumentaQtdNoToast");
    //Nesse loop, ele vai clicar para aumentar a quantidade para 2 vezes a quantidade existente no estoque
    for (var i = 0; i < qtdNoEstoque * 2; i++) {
      fireEvent.click(botaoAumentaQtd);
    }

    const quantidadeItensToast = screen.getByTestId("qtdInCart");

    expect(parseInt(quantidadeItensToast.textContent || "")).toBe(qtdNoEstoque);

    adicionaProdutoNoCarrinho.mockRestore();

    //Para tirar novamente do carrinho
    const botaoTirarDoCarrinho = screen.getByTestId("tiraDoCarrinho");
    fireEvent.click(botaoTirarDoCarrinho);
  });

  test("Ao clicar no botão de diminuir quantidade, no toast, a quantidade deve realmente diminuir e não deve passar da quantidade minima que é 1", () => {
    //Essa é a quantidade, no estoque, do produto que iremos testar(Fone)
    const qtdMinima = 1;
    const reduceProductFromCart = jest.spyOn(
      require("../../store/reducers/products"),
      "reduceProductFromCart"
    );

    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const botaoCarrinho = screen.getAllByTestId("adicionaNoCarrinho");
    fireEvent.click(botaoCarrinho[0]);

    //Abaixo, clicamos para aumentar a quantidade a fim de saber se a função de diminuir quantidade está sendo chamada
    const botaoAumentaQtd = screen.getByTestId("aumentaQtdNoToast");
    fireEvent.click(botaoAumentaQtd);

    const botaodiminuiQtd = screen.getByTestId("diminuiQtdNoToast");
    //Nesse loop, ele vai clicar 5 vezes para diminuir a quantidade, porém não deve deve ser possivel a quantidade ficar abaixo de 1
    for (let i = 0; i < 5; i++) {
      fireEvent.click(botaodiminuiQtd);
    }

    const qtdInCart = screen.getByTestId("qtdInCart");
    expect(parseInt(qtdInCart.textContent || "")).toBe(qtdMinima);
    expect(reduceProductFromCart).toHaveBeenCalled();

    //Para tirar novamente do carrinho
    const botaoTirarDoCarrinho = screen.getByTestId("tiraDoCarrinho");
    fireEvent.click(botaoTirarDoCarrinho);

    reduceProductFromCart.mockRestore();
  });

  test("O toast deve sair da página quando clicar no botão de confirmar, no toast", () => {
    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const botaoCarrinho = screen.getAllByTestId("adicionaNoCarrinho");
    fireEvent.click(botaoCarrinho[0]);

    const botaoConfirmar = screen.getByTestId("botaoConfirmar");
    const toast = screen.getByTestId("toastProductQtd");
    fireEvent.click(botaoConfirmar);

    expect(toast).not.toBeInTheDocument();

    //Para tirar novamente do carrinho
    const botaoTirarDoCarrinho = screen.getByTestId("tiraDoCarrinho");
    fireEvent.click(botaoTirarDoCarrinho);
  });

  test("O toast deve sair da página quando clicar pra tirar o produto do carrinho", () => {
    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const botaoCarrinho = screen.getAllByTestId("adicionaNoCarrinho");
    fireEvent.click(botaoCarrinho[0]);

    const toast = screen.getByTestId("toastProductQtd");

    //Para tirar novamente do carrinho
    const botaoTirarDoCarrinho = screen.getByTestId("tiraDoCarrinho");
    fireEvent.click(botaoTirarDoCarrinho);

    expect(toast).not.toBeInTheDocument();
  });

  test("Não deve ser possível adicionar um novo produto no carrinho enquanto um toast está ativo", () => {
    render(
      <Provider store={store}>
        <ProductsHome />
      </Provider>
    );

    const botaoCarrinho = screen.getAllByTestId("adicionaNoCarrinho");
    //Nesse click vai gerar um toast para um celular
    fireEvent.click(botaoCarrinho[0]);

    const toastCelular = screen.getByTestId("nameProductInToast");
    expect(toastCelular).toBeInTheDocument();

    //Esse click gera um toast para um fone, mas como o toast do celular está ativo, não deve renderizar esse e nem adicionar o fone no carrinho
    fireEvent.click(botaoCarrinho[1]);

    expect(toastCelular).toBeInTheDocument();

    expect(botaoCarrinho[1]).toBeInTheDocument();

    //Para tirar novamente do carrinho
    const botaoTirarDoCarrinho = screen.getByTestId("tiraDoCarrinho");
    fireEvent.click(botaoTirarDoCarrinho);
  });
});
