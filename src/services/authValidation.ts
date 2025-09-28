export type PasswordRules = {
  minLength: number;
  complexity: RegExp;
  guidance: string;
};

export type CredentialValidationResult = {
  email: string;
  password: string;
  error: string | null;
};


/**
 * Normalizes an email address by trimming and converting to lowercase.
 *
 * @param value The email address to normalize.
 * @returns The normalized email address.
 */
export const normalizeEmail = (value: string): string => value.trim().toLowerCase();


/**
 * Sanitizes a password by trimming whitespace.
 *
 * @param value The password to sanitize.
 * @returns The sanitized password.
 */
export const sanitizePassword = (value: string): string => value.trim();

/**
 * Validates an email address for basic format and presence.
 *
 * @param value The email address to validate.
 * @returns An error message if invalid, otherwise null.
 */
export const validateEmail = (value: string): string | null => {
  if (!value) {
    return 'Please provide a valid email address.';
  }
  if (!value.includes('@') || value.split('@')[0].length === 0) {
    return 'Please provide a valid email address.';
  }
  return null;
};

/**
 * Validates password strength against provided rules.
 *
 * @param password The password to validate.
 * @param rules The password rules to enforce.
 * @returns An error message if invalid, otherwise null.
 */
export const validatePasswordStrength = (password: string, rules: PasswordRules): string | null => {
  if (password.length < rules.minLength) {
    return `Password must be at least ${rules.minLength} characters long.`;
  }
  if (!rules.complexity.test(password)) {
    return rules.guidance;
  }
  return null;
};

/**
 * Ensures a password is present (not empty).
 *
 * @param password The password to check.
 * @returns An error message if missing, otherwise null.
 */
const ensurePasswordPresent = (password: string): string | null => {
  if (!password) {
    return 'Password is required.';
  }
  return null;
};

/**
 * Validates registration credentials (email and password) against rules.
 *
 * @param email The email address to validate.
 * @param password The password to validate.
 * @param rules The password rules to enforce.
 * @returns The normalized credentials and any error message.
 */
export const validateRegistrationCredentials = (
  email: string,
  password: string,
  rules: PasswordRules,
): CredentialValidationResult => {
  const normalizedEmail = normalizeEmail(email);
  const sanitizedPassword = sanitizePassword(password);

  const emailError = validateEmail(normalizedEmail);
  if (emailError) {
    return { email: normalizedEmail, password: sanitizedPassword, error: emailError };
  }

  const passwordError = validatePasswordStrength(sanitizedPassword, rules);
  if (passwordError) {
    return { email: normalizedEmail, password: sanitizedPassword, error: passwordError };
  }

  return { email: normalizedEmail, password: sanitizedPassword, error: null };
};

/**
 * Validates login credentials (email and password) against rules.
 *
 * @param email The email address to validate.
 * @param password The password to validate.
 * @returns The normalized credentials and any error message.
 */
export const validateLoginCredentials = (
  email: string,
  password: string,
): CredentialValidationResult => {
  const normalizedEmail = normalizeEmail(email);
  const sanitizedPassword = sanitizePassword(password);

  if (!normalizedEmail || !sanitizedPassword) {
    return {
      email: normalizedEmail,
      password: sanitizedPassword,
      error: 'Email and password are required.',
    };
  }

  const emailError = validateEmail(normalizedEmail);
  if (emailError) {
    return { email: normalizedEmail, password: sanitizedPassword, error: emailError };
  }

  const presenceError = ensurePasswordPresent(sanitizedPassword);
  if (presenceError) {
    return { email: normalizedEmail, password: sanitizedPassword, error: presenceError };
  }

  return { email: normalizedEmail, password: sanitizedPassword, error: null };
};
