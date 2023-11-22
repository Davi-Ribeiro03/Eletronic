import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import CardLogin from "./CardLogin";
import "@testing-library/jest-dom";
import AppRoutes from "../../routes/Router";
import { BrowserRouter } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../context/ToastContext";
import { createPortal } from "react-dom";
import { JsxElement } from "typescript";
import store from "../../store/index";
import ProductsHome from "../ProductsHome/ProductsHome";
import React from "react";
import { Provider } from "react-redux";
import { timeToast } from "../../utils/timeToast";
import Modal from "react-modal";

describe("Componente <CardLogin />", () => {
  test("Deve renderizar o aviso para preencher os dados", () => {
    const setUserData = jest.fn();
    render(<CardLogin setUserData={setUserData} />);

    const loginAviso = screen.getByText(
      "Preencha os dados do login para acessar"
    );

    expect(loginAviso).toBeInTheDocument();
  });

  test("Deve renderizar dois inputs que podem ser preenchidos", async () => {
    const setUserData = jest.fn();

    render(<CardLogin setUserData={setUserData} />);

    const usuario = screen.getByPlaceholderText("Usuário");
    const senha = screen.getByPlaceholderText("Senha");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    // act(() => {
    //   userEvent.type(usuario, "Davi");
    // });

    fireEvent.change(usuario, { target: { value: "Davi" } });
    fireEvent.change(senha, { target: { value: "1234" } });

    expect(usuario).toHaveValue("Davi");
    expect(senha).toHaveValue("1234");
  });

  test("Deve renderizar a imagem de pessoa no campo usuário e a imagem do olho no campo de senha", () => {
    const setUserData = jest.fn();
    render(<CardLogin setUserData={setUserData} />);

    const usuario = screen.getByTestId("usuario");
    const senhaEscondida = screen.getByTestId("senhaEscondida");

    expect(usuario).toBeVisible();
    expect(senhaEscondida).toBeVisible();
  });

  test("A senha deve se tornar visível quando o usuário clicar no olhinho ", () => {
    const setUserData = jest.fn();
    render(<CardLogin setUserData={setUserData} />);

    const senha = screen.getByPlaceholderText("Senha");
    fireEvent.change(senha, { target: { value: "1234" } });

    expect(senha).toHaveAttribute("type", "password");

    const deixaSenhaVisivel = screen.getByTestId("eye");
    fireEvent.click(deixaSenhaVisivel);

    expect(senha).toHaveAttribute("type", "text");
  });

  test("Deve ser renderizado um erro ao tentar logar com campo de input vazio", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );

    const botao = screen.getByRole("button");

    fireEvent.click(botao);

    await waitFor(() => {
      const toastErro = screen.getByText(
        "Preencha os campos de usuário e senha"
      );

      expect(toastErro).toBeVisible();
    });
  });

  test("Deve ser renderizado um erro ao tentar logar com informações incorretas ", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );

    const usuario = screen.getByPlaceholderText("Usuário");
    const senha = screen.getByPlaceholderText("Senha");
    const botao = screen.getByRole("button");

    fireEvent.change(usuario, { target: { value: "Davi" } });
    fireEvent.change(senha, { target: { value: "12" } });
    fireEvent.click(botao);

    await waitFor(() => {
      const toastErro = screen.getByText("Usuário ou senha incorretos");

      expect(toastErro).toBeVisible();
    });
  });

  test("O usuário deve ser redirecionado para a página principal após realizar o login", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );

    const usuario = screen.getByPlaceholderText("Usuário");
    const senha = screen.getByPlaceholderText("Senha");
    const botao = screen.getByRole("button");

    fireEvent.change(usuario, { target: { value: "Davi" } });
    fireEvent.change(senha, { target: { value: "1234" } });
    fireEvent.click(botao);

    await waitFor(() => expect(window.location.pathname).toBe("/Home"));
    expect(screen.getByText("ELETRONIC")).toBeInTheDocument();

    const logout = screen.getByText("Logout");
    fireEvent.click(logout);
  });

  test("Ao renderizar o Toast com um erro na página, a função timeOut deve ser chamada para tirar a visibilidade do toast depois um tempo", async () => {
    const timeToast = jest.spyOn(require("../../utils/TimeToast"), "timeToast");
    const setUserData = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );

    const botao = screen.getByRole("button");
    fireEvent.click(botao);
    expect(timeToast).toHaveBeenCalled();
  });
});
