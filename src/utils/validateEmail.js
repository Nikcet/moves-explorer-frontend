import validator from 'validator';

export default function validateEmail(input) {
  return validator.isEmail(input.value);
}