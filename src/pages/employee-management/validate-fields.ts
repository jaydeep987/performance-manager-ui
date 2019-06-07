import * as yup from 'yup';
import { Roles, User, Sex } from '~model/user';
import { ValidationResult } from '~types/validator';

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required(),
    lastName: yup
      .string()
      .required(),
    sex: yup
      .string()
      .required()
      .oneOf(Object.values(Sex)),
    userName: yup
      .string()
      .required(),
    password: yup
      .string()
      .required(),
    role: yup
      .string()
      .required()
      .oneOf(Object.values(Roles)),
  });

/**
 * Validates row when adding/editing
 */
export function validateRow(data: User): ValidationResult {
  try {
    schema.validateSync(data);

    return { isValid: true };
  } catch (err) {
    console.log('vali', err);
    const message = typeof err === 'string' ? err : err.message;

    return { isValid: false, message };
  }
}
