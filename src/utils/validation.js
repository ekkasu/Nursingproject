// Email validation
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

// Phone validation (accepts formats: +XXX-XXXXXXXXX or XXXXXXXXXX)
export const validatePhone = (phone) => {
  const re = /^(\+\d{1,3}-?)?\d{9,10}$/;
  return re.test(String(phone).replace(/\s/g, ''));
};

// Password validation (min 8 chars, at least one number, one letter)
export const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(String(password));
};

// Format phone number to standard format
export const formatPhoneNumber = (phone) => {
  const cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length <= 10) {
    return cleaned;
  }
  return cleaned.slice(0, 10);
}; 