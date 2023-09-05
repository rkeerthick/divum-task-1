import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("form validation", () => {
  test("Email id validation", () => {
    render(<App />);
    const addBtn = screen.getByTestId("add-btn");
    fireEvent.click(addBtn);
    const email = screen.getByTestId("email");
    const submit = screen.getByTestId("submit");


    // Test case 1
    fireEvent.change(email, { target: { value: "" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("email-error-msg").innerHTML).toBe(
      "Enter email id"
    );


    // Test case 2
    fireEvent.change(email, { target: { value: "asakthivel@gmail.com" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("email-error-msg").innerHTML).toBe("");


    // Test case 3
    fireEvent.change(email, { target: { value: "asakthivel" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("email-error-msg").innerHTML).toBe(
      "Invalid Email"
    );
  });
});
