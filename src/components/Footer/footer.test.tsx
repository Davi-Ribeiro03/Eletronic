import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("<Footer/>", () => {
  test("Deve renderizar o Footer com a classe footer", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveClass("footer");
  });
});
