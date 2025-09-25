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

export const normalizeEmail = (value: string): string => value.trim().toLowerCase();

export const sanitizePassword = (value: string): string => value.trim();

export const validateEmail = (value: string): string | null => {
  if (!value) {
    return 'Please provide a valid email address.';
  }

  if (!value.includes('@') || value.split('@')[0].length === 0) {
    return 'Please provide a valid email address.';
  }

  return null;
};

export const validatePasswordStrength = (password: string, rules: PasswordRules): string | null => {
  if (password.length < rules.minLength) {
    return `Password must be at least ${rules.minLength} characters long.`;
  }

  if (!rules.complexity.test(password)) {
    return rules.guidance;
  }

  return null;
};

const ensurePasswordPresent = (password: string): string | null => {
  if (!password) {
    return 'Password is required.';
  }

  return null;
};

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
