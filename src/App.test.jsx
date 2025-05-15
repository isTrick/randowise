import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { describe, it, expect, beforeEach } from "vitest";

// Helper to fill input and submit
function submitNames(names, keepLast = false) {
  render(<App />);
  const input = screen.getByPlaceholderText(/digite items/i);
  const button = screen.getByText(/enviar/i);
  const checkbox = screen.getByLabelText(/manter o último item/i);
  fireEvent.change(input, { target: { value: names } });
  if (keepLast) fireEvent.click(checkbox);
  fireEvent.click(button);
}

describe("App", () => {
  beforeEach(() => {
    // Clean up DOM between tests
    document.body.innerHTML = "";
  });

  it("embaralha e exibe nomes separados por espaço", () => {
    submitNames("Ana Bia Caio Duda");
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items.sort()).toEqual(["Ana", "Bia", "Caio", "Duda"].sort());
  });

  it("embaralha e exibe nomes separados por vírgula", () => {
    submitNames("Ana,Bia,Caio,Duda");
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items.sort()).toEqual(["Ana", "Bia", "Caio", "Duda"].sort());
  });

  it("mantém o último nome na última posição quando checkbox está marcado", () => {
    submitNames("Ana Bia Caio Duda", true);
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items[items.length - 1]).toBe("Duda");
    expect(items.slice(0, -1).sort()).toEqual(["Ana", "Bia", "Caio"].sort());
  });

  it("não mantém o último nome se checkbox não está marcado", () => {
    submitNames("Ana Bia Caio Duda");
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    // O último pode ser qualquer um
    expect(items.length).toBe(4);
    expect(items.sort()).toEqual(["Ana", "Bia", "Caio", "Duda"].sort());
  });

  it("ignora espaços e vírgulas extras", () => {
    submitNames(" Ana ,  Bia  ,Caio   Duda  ");
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items.sort()).toEqual(["Ana", "Bia", "Caio", "Duda"].sort());
  });
});
