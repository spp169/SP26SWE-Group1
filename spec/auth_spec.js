// spec/auth_spec.js
import { validateSignup } from '../src/lib/auth-logic';

describe("Sign Up Validation Logic", function() {
  
  it("should return true for valid Rutgers scarletmail", function() {
    const result = validateSignup("johndoe@scarletmail.rutgers.edu", "Rutgers1766!");
    expect(result.isValid).toBe(true);
  });

  it("should return false for gmail or other non-Rutgers emails", function() {
    const result = validateSignup("student@gmail.com", "Rutgers1766!");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Must use a @scarletmail.rutgers.edu email.");
  });

  it("should reject passwords shorter than 8 characters", function() {
    const result = validateSignup("johndoe@scarletmail.rutgers.edu", "abc123");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Password must be 8+ characters with a letter, number, and symbol.");
  });

  it("should reject email addresses that are not scarletmail.rutgers.edu", function() {
    const result = validateSignup("johndoe@rutgers.edu", "Rutgers1766!");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Must use a @scarletmail.rutgers.edu email.");
  });

  it("should reject passwords with no number", function() {
    const result = validateSignup("johndoe@scarletmail.rutgers.edu", "Rutgers!!!");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Password must be 8+ characters with a letter, number, and symbol.");
  });

  it("should reject passwords with no symbol", function() {
    const result = validateSignup("johndoe@scarletmail.rutgers.edu", "Rutgers1766");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Password must be 8+ characters with a letter, number, and symbol.");
  });

});