import validator from 'validator';

export default function validateEmail(input) {
  return validator.isStrongPassword(input.value, {
    minSymbols: 0,
    minUppercase: 0,
  });
}