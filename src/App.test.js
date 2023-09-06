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

    it("should return false for a name with special characters {space}", () => {
      expect(nameValidation("   ")).toBe(false);
    });
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


  describe("DOB Validation", () => {
    it("should return true for a valid date", () => {
      expect(dateValidation(new Date())).toBe(true);
    });
    it("should return false for an empty date", () => {
      expect(dateValidation(null)).toBe(false);
    });
  });
});
