import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { wait } from "@testing-library/user-event/dist/utils";

describe("form validation", () => {
  test("Email id validation", () => {
    render(<App />);
    const addBtn = screen.getByTestId("add-btn");
    fireEvent.click(addBtn);
    const email = screen.getByTestId("email");
    const submit = screen.getByTestId("submit");

    // // Test case 1
    fireEvent.change(email, { target: { value: "keerthick@gmail.com" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("email-error-msg").innerHTML).toBe("");

    // // Test case 1
    fireEvent.change(email, { target: { value: "" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("email-error-msg").innerHTML).toBe(
      "Enter email id"
    );

    // // Test case 3
    fireEvent.change(email, { target: { value: "keerthick" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("email-error-msg").innerHTML).toBe(
      "Invalid Email"
    );
  });

  test("First name validation", () => {
    render(<App />);
    // const addBtn = screen.getByTestId("add-btn");
    // fireEvent.click(addBtn);
    const email = screen.getByTestId("email");
    const firstName = screen.getByTestId("firstName");
    const submit = screen.getByTestId("submit");

    fireEvent.change(email, { target: { value: "keerthick@gmail.com" } });

    // // Test case 1
    fireEvent.change(firstName, { target: { value: "Keerthick" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("firstName-error-msg").innerHTML).toBe("");

    // Test case 2
    fireEvent.change(firstName, { target: { value: "" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("firstName-error-msg").innerHTML).toBe(
      "Enter first name"
    );

    // Test case 3
    fireEvent.change(firstName, { target: { value: "   " } });
    fireEvent.click(submit);
    expect(screen.getByTestId("firstName-error-msg").innerHTML).toBe(
      "Enter only alphabets..."
    );

    // // // Test case 4
    fireEvent.change(firstName, { target: { value: "keerthick1" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("firstName-error-msg").innerHTML).toBe(
      "Enter only alphabets..."
    );
  });

  test("Last name validation", () => {
    render(<App />);
    // const addBtn = screen.getByTestId("add-btn");
    // fireEvent.click(addBtn);
    const email = screen.getByTestId("email");
    const firstName = screen.getByTestId("firstName");
    const lastName = screen.getByTestId("lastName");
    const submit = screen.getByTestId("submit");
    fireEvent.change(email, { target: { value: "keerthick@gmail.com" } });
    fireEvent.change(firstName, { target: { value: "Keerthick" } });

    // // Test case 1
    fireEvent.change(lastName, { target: { value: "Ravikumar" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("lastName-error-msg").innerHTML).toBe("");

    // Test case 2
    fireEvent.change(lastName, { target: { value: "" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("lastName-error-msg").innerHTML).toBe(
      "Enter last name"
    );

    // Test case 3
    fireEvent.change(lastName, { target: { value: "keer1" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("lastName-error-msg").innerHTML).toBe(
      "Enter only alphabets..."
    );
  });

  test("Phone number validation", () => {
    render(<App />);
    const email = screen.getByTestId("email");
    const firstName = screen.getByTestId("firstName");
    const lastName = screen.getByTestId("lastName");
    const phone = screen.getByTestId("phoneNumber");
    const submit = screen.getByTestId("submit");

    fireEvent.change(email, { target: { value: "keerthick@gmail.com" } });
    fireEvent.change(firstName, { target: { value: "Keerthick" } });
    fireEvent.change(lastName, { target: { value: "Ravikumar" } });

    // Test case 1
    fireEvent.change(phone, { target: { value: "9876543210" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("phNo-error-msg").innerHTML).toBe("");

    // Test case 2
    fireEvent.change(phone, { target: { value: "" } });
    fireEvent.click(submit);
    expect(screen.getByTestId("phNo-error-msg").innerHTML).toBe(
      "Enter phone number"
    );
  });
});
