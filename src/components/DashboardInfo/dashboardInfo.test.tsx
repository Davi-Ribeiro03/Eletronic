import { render, screen } from "@testing-library/react";
import DashboardInfo from "./DashboardInfo";
import "@testing-library/jest-dom";

describe("<DashboardInfo />", () => {
  test.only("Deve renderizar o componente com as informações passadas", () => {
    const titulo = "Preço";
    const value = 50;
    const novoTitulo = "Estoque";
    const quantidade = 20;

    render(<DashboardInfo titulo={titulo} value={value} />);

    let infoTitulo = screen.getByText("Preço");
    const infoValue = screen.getByText("R$50,00");

    expect(infoTitulo).toBeInTheDocument();
    expect(infoValue).toBeInTheDocument();

    render(<DashboardInfo titulo={novoTitulo} quantidade={quantidade} />);
    infoTitulo = screen.getByText("Estoque");
    const infoQuantidade = screen.getByText(20);

    expect(infoTitulo).toBeInTheDocument();
    expect(infoTitulo).toHaveTextContent("Estoque");
    expect(infoQuantidade).toBeInTheDocument();
  });
});
