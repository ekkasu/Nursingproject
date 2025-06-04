const API_BASE_URL = 'https://35da-197-251-192-177.ngrok-free.app/api';

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  console.log('Response Content-Type:', contentType);
  console.log('Response Status:', response.status);
  
  if (!response.ok) {
    try {
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.message || 'API Error');
      } else {
        const text = await response.text();
        console.error('Error Response Text:', text);
        throw new Error(text || `HTTP error! status: ${response.status}`);
      }
    } catch (e) {
      console.error('Error handling response:', e);
      throw new Error(`Request failed: ${e.message}`);
    }
  }

  try {
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Response Data:', data);
      return data;
    } else {
      const text = await response.text();
      console.warn('Response was not JSON:', text);
      return text;
    }
  } catch (e) {
    console.error('Error parsing response:', e);
    throw new Error(`Failed to parse response: ${e.message}`);
  }
};

const api = {
  // Authentication
  register: (data) => 
    fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(data),
    }).then(handleResponse),

  login: (credentials) =>
    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(credentials),
    }).then(handleResponse),
  
  // Get requests
  getJobTitles: async () => {
    try {
      console.log('Fetching job titles from:', `${API_BASE_URL}/utils/job-title/get`);
      const response = await fetch(`${API_BASE_URL}/utils/job-title/get`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      console.log('Job Titles Response Status:', response.status);
      console.log('Job Titles Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await handleResponse(response);
      console.log('Job Titles Data:', data);
      
      // If data is an array, return it directly
      if (Array.isArray(data)) {
        return data;
      }
      
      // If data has a specific property containing the job titles
      if (data.data) {
        return data.data;
      }
      
      // If data has a different structure
      console.warn('Unexpected job titles data structure:', data);
      return [];
    } catch (error) {
      console.error('Error fetching job titles:', error);
      return [];
    }
  },

  getUserTitles: () => 
    fetch(`${API_BASE_URL}/user-titles`, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    }).then(handleResponse),

  getRegions: () => 
    fetch(`${API_BASE_URL}/regions`, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    }).then(handleResponse),

  getDistricts: (regionId) => 
    fetch(`${API_BASE_URL}/findDistrictByRegion/${regionId}`, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    }).then(handleResponse),

  getCategories: () => 
    fetch(`${API_BASE_URL}/categories`, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    }).then(handleResponse),
};

export default api; 