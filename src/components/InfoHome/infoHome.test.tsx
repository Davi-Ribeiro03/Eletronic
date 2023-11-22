import { render, screen } from "@testing-library/react";
import InfoHome from "./InfoHome";
import "@testing-library/jest-dom";

describe("<InfoHome/>", () => {
  test("Deve renderizar o Título da página inicial", () => {
    render(<InfoHome />);

    expect(screen.getByText("ELETRONIC")).toBeInTheDocument();
  });
});
