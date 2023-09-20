import {
  emailValidation,
  nameValidation,
  mobileValidation,
  addressValidation,
  dateValidation,
} from "./components/Form/Validation";


describe("Validation Functions", () => {
  describe("Email validation", () => {
    it("should return true for a valid email", () => {
      expect(emailValidation("test@divum.in")).toBe(true);
    });
    it("should return false for an empty string", () => {
      expect(emailValidation("")).toBe(false);
    });
    it("should return false for an invalid email", () => {
      expect(emailValidation("invalid-email")).toBe(false);
    });
  });


  describe("First name Validation", () => {
    it("should return true for a valid name", () => {
      expect(nameValidation("Keerthick")).toBe(true);
    });
    it("should return false for an empty string", () => {
      expect(nameValidation("")).toBe(false);
    });
    it("should return false for a name with special characters", () => {
      expect(nameValidation("1234")).toBe(false);
    });

<<<<<<< HEAD
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
=======
    it("should return false for a name with special characters {space}", () => {
      expect(nameValidation("   ")).toBe(false);
    });
>>>>>>> 28fbd3a9c8d8e8a96cf7817473b8955f37f005d3
  });

  describe("Last name Validation", () => {
    it("should return true for a valid name", () => {
      expect(nameValidation("R")).toBe(true);
    });
    it("should return false for an empty string", () => {
      expect(nameValidation("")).toBe(false);
    });
    it("should return false for a name with special characters", () => {
      expect(nameValidation("r123")).toBe(false);
    });
    it("should return false for a name with special characters {space}", () => {
      expect(nameValidation("   ")).toBe(false);
    });
  });
  describe("Phone number validation", () => {
    it("should return true for a valid mobile number", () => {
      expect(mobileValidation("1234567890")).toBe(true);
    });
    it("should return false for an empty string", () => {
      expect(mobileValidation("")).toBe(false);
    });
    it("should return false for an invalid mobile number", () => {
      expect(mobileValidation("12345")).toBe(false);
    });
  });
  describe("Address validation", () => {
    it("should return true for a valid address", () => {
      expect(addressValidation("Coimbatore")).toBe(true);
    });
    it("should return false for an empty string", () => {
      expect(addressValidation("")).toBe(false);
    });
    it("should return false for an address longer than 50 characters", () => {
      expect(
        addressValidation(
          "qwertyuioqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuioqwertyuioqwertyuiop"
        )
      ).toBe(false);
    });
  });

<<<<<<< HEAD
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
=======

  describe("DOB Validation", () => {
    it("should return true for a valid date", () => {
      expect(dateValidation(new Date())).toBe(true);
    });
    it("should return false for an empty date", () => {
      expect(dateValidation(null)).toBe(false);
    });
>>>>>>> 28fbd3a9c8d8e8a96cf7817473b8955f37f005d3
  });
});
