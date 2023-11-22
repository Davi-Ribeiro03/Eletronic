import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Chart } from "./Chart";
import { dadosDoGrafico } from "../../utils/dadosDoGrafico";

describe("<Chart/>", () => {
  test("Deve renderizar o gráfico com os produtos corretos", () => {
    render(<Chart />);

    const chart = screen.getByTestId("chart");
    expect(chart).toBeInTheDocument();
  });
});
