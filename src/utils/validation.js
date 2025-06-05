// Email validation
export const validateEmail = (email) => {
  // Allow empty email for form filling, validation will happen on submit
  if (!email || email === '') return true;
  
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

// Phone validation (more lenient to allow for various formats)
export const validatePhone = (phone) => {
  // Allow empty phone for form filling, validation will happen on submit
  if (!phone || phone === '') return true;
  
  // Remove all non-digit characters for comparison
  const digits = String(phone).replace(/\D/g, '');
  // Allow phone numbers with 9-15 digits (to accommodate international formats)
  return digits.length >= 9 && digits.length <= 15;
};

// Password validation (min 8 chars, at least one number, one letter)
export const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(String(password));
};

// Format phone number to standard format
export const formatPhoneNumber = (phone) => {
  const cleaned = String(phone).replace(/\D/g, '');
  return cleaned;
}; 