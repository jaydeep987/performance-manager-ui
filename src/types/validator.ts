export interface ValidationResult {
  /** Status of validation */
  isValid: boolean;
  /** Message in case there is error */
  message?: string;
}
