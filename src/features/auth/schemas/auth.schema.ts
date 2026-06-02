const emailPattern = /^\S+@\S+\.\S+$/;

export function validateEmail(email: string) {
  return emailPattern.test(email);
}

export function validatePassword(password: string) {
  return password.length >= 6;
}

export function validateOtp(code: string) {
  return /^[0-9]{6}$/.test(code.trim());
}
