import { screen, render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomModal from "./CustomModal";
import { Provider } from "react-redux";
import store from "../../store";
import userEvent from "@testing-library/user-event";
import { FormProvider } from "../../context/FormContext";
import { addProduct } from "../../store/reducers/products";

describe("CustomModal", () => {
  it("Deve renderizar o modal", () => {
    var modal = true;
    render(
      <Provider store={store}>
        <CustomModal
          modalIsOpen={modal}
          setIsOpen={(x: boolean) => (modal = x)}
          openModal={() => {
            modal = true;
          }}
          closeModal={() => {
            modal = false;
          }}
        />
      </Provider>
    );
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
  it("Deve ser possivel preencher os inputs ", async () => {
    var modal = true;
    render(
      <Provider store={store}>
        <FormProvider>
          <CustomModal
            modalIsOpen={modal}
            setIsOpen={(x: boolean) => (modal = x)}
            openModal={() => {
              modal = true;
            }}
            closeModal={() => {
              modal = false;
            }}
          />
        </FormProvider>
      </Provider>
    );

    const nome = screen.getByPlaceholderText("Nome do produto");
    const descricao = screen.getByPlaceholderText("Descrição do produto");
    const urlImagem = screen.getByPlaceholderText("Url da imagem");
    const valor = screen.getByPlaceholderText("Valor do produto");
    const quantidade = screen.getByPlaceholderText("Quantidade de produtos");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(nome, "Computador");
      userEvent.type(descricao, "Um bom computador");
      userEvent.type(urlImagem, "https://www.google.com.br");
      userEvent.type(valor, "1000");
      userEvent.type(quantidade, "10");
    });

    expect(nome).toHaveValue("Computador");
    expect(descricao).toHaveValue("Um bom computador");
    expect(urlImagem).toHaveValue("https://www.google.com.br");
    expect(valor).toHaveValue(1000);
    expect(quantidade).toHaveValue(10);
  });
  it("Deve ser possivel fechar o modal", async () => {
    var modal = true;
    const mockCloseModal = jest.fn();
    render(
      <Provider store={store}>
        <FormProvider>
          <CustomModal
            modalIsOpen={modal}
            setIsOpen={(x: boolean) => (modal = x)}
            openModal={() => {
              modal = true;
            }}
            closeModal={mockCloseModal}
          />
        </FormProvider>
      </Provider>
    );

    const closeModal = screen.getByTestId("closaModal");

    fireEvent.click(closeModal);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("Deve ser possivel adicionar um produto", async () => {
    const cadastraProduto = jest.spyOn(
      require("../../store/reducers/products"),
      "addProduct"
    );
    var modal = true;
    const mockCloseModal = () => (modal = false);
    render(
      <Provider store={store}>
        <FormProvider>
          <CustomModal
            modalIsOpen={modal}
            setIsOpen={(x: boolean) => (modal = x)}
            openModal={() => {
              modal = true;
            }}
            closeModal={mockCloseModal}
          />
        </FormProvider>
      </Provider>
    );

    const cadastrar = screen.getByTestId("cadastrar");

    const nome = screen.getByPlaceholderText("Nome do produto");
    const descricao = screen.getByPlaceholderText("Descrição do produto");
    const urlImagem = screen.getByPlaceholderText("Url da imagem");
    const valor = screen.getByPlaceholderText("Valor do produto");
    const quantidade = screen.getByPlaceholderText("Quantidade de produtos");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(nome, "Computador");
      userEvent.type(descricao, "Um bom computador");
      userEvent.type(urlImagem, "https://www.google.com.br");
      userEvent.type(valor, "1000");
      userEvent.type(quantidade, "10");
      userEvent.click(cadastrar);
    });

    expect(cadastraProduto).toHaveBeenCalled();
    cadastraProduto.mockRestore();
  });
});
