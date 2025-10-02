import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("TodoApp", () => {
    test("має заголовок TODO", () => {
        render(<App />);
        expect(screen.getByText(/TODO/i)).toBeInTheDocument();
    });

    test("можна вводити букви та цифри у поле", () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/Введіть завдання/i);

        fireEvent.change(input, { target: { value: "123abc" } });
        expect(input.value).toBe("123abc");
    });

    test("порожнє поле викликає помилку", () => {
        render(<App />);
        const button = screen.getByText(/Додати/i);

        fireEvent.click(button);

        expect(screen.getByText(/Поле не може бути порожнім/i)).toBeInTheDocument();
    });

    test("можна додати нове завдання", () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/Введіть завдання/i);
        const button = screen.getByText(/Додати/i);

        fireEvent.change(input, { target: { value: "Купити хліб" } });
        fireEvent.click(button);

        expect(screen.getByText("Купити хліб")).toBeInTheDocument();
    });

    test("можна позначити завдання виконаним", () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/Введіть завдання/i);
        const button = screen.getByText(/Додати/i);

        fireEvent.change(input, { target: { value: "Зробити ДЗ" } });
        fireEvent.click(button);

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });
});
