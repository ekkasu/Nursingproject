// Email validation with popular domains
export const validateEmail = (email) => {
  const popularDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'protonmail.com',
    'zoho.com',
    'mail.com'
  ];
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  // Check if domain is in popular domains list
  const domain = email.split('@')[1].toLowerCase();
  return popularDomains.includes(domain);
};

// Phone number validation (10 digits)
export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Format phone number to only contain digits
export const formatPhoneNumber = (phone) => {
  return phone.replace(/\D/g, '').slice(0, 10);
}; 