const API_BASE_URL = 'https://portal.mohannualcon.com/api';

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  console.log('Response Content-Type:', contentType);
  console.log('Response Status:', response.status);
  
  if (!response.ok) {
    try {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error('Error Response Data:', JSON.stringify(errorData, null, 2));
        
        // Check for Laravel validation error format
        if (errorData.errors && typeof errorData.errors === 'object') {
          // Format validation errors into a readable message
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
          
          throw new Error(`Validation failed: ${errorMessages}`);
        } else if (errorData.message) {
          // If there's a message but no errors object
          throw new Error(`API Error: ${errorData.message}`);
        } else {
          // Log the entire error response for debugging
          console.error('Unstructured error response:', errorData);
          throw new Error('API Error: Unknown validation error');
        }
      } else {
        const text = await response.text();
        console.error('Error Response Text:', text);
        throw new Error(text || `HTTP error! status: ${response.status}`);
      }
    } catch (e) {
      console.error('Error handling response:', e);
      throw e; // Rethrow the enhanced error
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
  register: async (data) => {
    console.log('Register API called with data:', data);
    
    // Make sure we're sending the correct field names to the API
    const formattedData = {
      user_title_id: data.user_title_id,
      full_name: data.full_name,
      phone: data.phone,
      email: data.email,
      gender: data.gender,
      job_title_id: data.job_title_id,
      place_of_work: data.place_of_work,
      region_id: data.region_id,
      district_id: data.district_id,
      profile: data.profile || '',
      password: data.password,
      password_confirmation: data.password_confirmation // Ensure this matches the backend expectation
    };
    
    console.log('Formatted registration data:', formattedData);
    
    // Use the specific endpoint provided
    const endpoint = `${API_BASE_URL}/register`;
    
    try {
      console.log('Sending registration request to:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(formattedData),
      });
      
      console.log('Register API response status:', response.status);
      console.log('Register API response headers:', Object.fromEntries(response.headers.entries()));
      
      const result = await handleResponse(response);
      console.log('Register API response data:', result);
      return result;
    } catch (error) {
      console.error(`Error with endpoint ${endpoint}:`, error);
      throw error;
    }
  },

  // Authentication with profile picture upload
  registerWithProfilePicture: async (formData) => {
    console.log('Register API called with FormData');
    
    // Check if we're dealing with FormData or regular JSON data
    const isFormData = formData instanceof FormData;
    
    // Use the specific endpoint provided
    const endpoint = `${API_BASE_URL}/register`;
    
    try {
      console.log(`Sending registration request to: ${endpoint}`);
      
      let headers = {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      };
      
      // Only add Content-Type for JSON data, not for FormData
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      // Log request details
      console.log('Request headers:', headers);
      if (isFormData) {
        // Log FormData entries
        console.log('FormData entries:');
        for (let pair of formData.entries()) {
          if (pair[0].includes('password')) {
            console.log(pair[0] + ': [MASKED]');
          } else if (pair[0] === 'profile' && pair[1] instanceof File) {
            console.log(`${pair[0]}: File (${pair[1].name}, ${pair[1].type}, ${pair[1].size} bytes)`);
          } else {
            console.log(pair[0] + ': ' + pair[1]);
          }
        }
      } else {
        // Log JSON data (but mask passwords)
        const logData = {...formData};
        if (logData.password) logData.password = '[MASKED]';
        if (logData.password_confirmation) logData.password_confirmation = '[MASKED]';
        console.log('JSON data:', logData);
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: isFormData ? formData : JSON.stringify(formData),
      });
      
      console.log('Register API response status:', response.status);
      console.log('Register API response headers:', Object.fromEntries(response.headers.entries()));
      
      const result = await handleResponse(response);
      console.log('Register API response data:', result);
      return result;
    } catch (error) {
      console.error(`Error with endpoint ${endpoint}:`, error);
      throw error;
    }
  },

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

  getUserTitles: async () => {
    try {
      console.log('Fetching user titles from:', `${API_BASE_URL}/utils/user-title/get`);
      const response = await fetch(`${API_BASE_URL}/utils/user-title/get`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      console.log('User Titles Response Status:', response.status);
      console.log('User Titles Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await handleResponse(response);
      console.log('User Titles Data:', data);
      
      // If data is an array, return it directly
      if (Array.isArray(data)) {
        return data;
      }
      
      // If data has a specific property containing the user titles
      if (data.data) {
        return data.data;
      }
      
      // If data has a different structure
      console.warn('Unexpected user titles data structure:', data);
      return [];
    } catch (error) {
      console.error('Error fetching user titles:', error);
      return [];
    }
  },

  getRegions: async () => {
    try {
      console.log('Fetching regions from:', `${API_BASE_URL}/utils/regions/get`);
      const response = await fetch(`${API_BASE_URL}/utils/regions/get`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      console.log('Regions Response Status:', response.status);
      console.log('Regions Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await handleResponse(response);
      console.log('Regions Data:', data);
      
      // If data is an array, return it directly
      if (Array.isArray(data)) {
        return data;
      }
      
      // If data has a specific property containing the regions
      if (data.data) {
        return data.data;
      }
      
      // If data has a different structure
      console.warn('Unexpected regions data structure:', data);
      return [];
    } catch (error) {
      console.error('Error fetching regions:', error);
      return [];
    }
  },

  getDistricts: async () => {
    try {
      console.log('Fetching districts from:', `${API_BASE_URL}/utils/districts/get`);
      const response = await fetch(`${API_BASE_URL}/utils/districts/get`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      console.log('Districts Response Status:', response.status);
      console.log('Districts Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await handleResponse(response);
      console.log('Districts Data:', data);
      
      // If data is an array, return it directly
      if (Array.isArray(data)) {
        return data;
      }
      
      // If data has a specific property containing the districts
      if (data.data) {
        return data.data;
      }
      
      // If data has a different structure
      console.warn('Unexpected districts data structure:', data);
      return [];
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  },

  getDistrictsByRegion: async (regionId) => {
    try {
      console.log('Fetching districts by region from:', `${API_BASE_URL}/utils/districts/get`);
      const response = await fetch(`${API_BASE_URL}/utils/districts/get`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      console.log('Districts by Region Response Status:', response.status);
      console.log('Districts by Region Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await handleResponse(response);
      console.log('Districts by Region Data:', data);
      
      // Filter districts by region ID
      let districts = [];
      
      if (Array.isArray(data)) {
        // Convert regionId to the same type for comparison
        const regionIdNum = parseInt(regionId, 10);
        districts = data.filter(district => {
          const districtRegionId = parseInt(district.region_id, 10);
          return districtRegionId === regionIdNum;
        });
      } else if (data.data && Array.isArray(data.data)) {
        // Convert regionId to the same type for comparison
        const regionIdNum = parseInt(regionId, 10);
        districts = data.data.filter(district => {
          const districtRegionId = parseInt(district.region_id, 10);
          return districtRegionId === regionIdNum;
        });
      } else {
        console.warn('Unexpected districts data structure:', data);
        return [];
      }
      
      console.log(`Found ${districts.length} districts for region ID ${regionId}`);
      return districts;
    } catch (error) {
      console.error('Error fetching districts by region:', error);
      return [];
    }
  },

  getCategories: async () => {
    try {
      console.log('Fetching categories from:', `${API_BASE_URL}/utils/categories/get`);
      const response = await fetch(`${API_BASE_URL}/utils/categories/get`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      console.log('Categories Response Status:', response.status);
      console.log('Categories Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await handleResponse(response);
      console.log('Categories Data:', data);
      
      // If data is an array, return it directly
      if (Array.isArray(data)) {
        return data;
      }
      
      // If data has a specific property containing the categories
      if (data.data) {
        return data.data;
      }
      
      // If data has a different structure
      console.warn('Unexpected categories data structure:', data);
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
};

export default api; 

// Sample registration payload:
// {
//   "user_title_id": "1",
//   "full_name": "name Eug",
//   "phone": "0234345395",
//   "email": "masil2@gmail.com",
//   "gender": "m",
//   "job_title_id": "2",
//   "place_of_work": "Accra",
//   "region_id": "1",
//   "district_id": "1",
//   "profile":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...", // Base64 encoded image data
//   "password":"@#22333ffkflksj",
//   "password_confirmation":"@#22333ffkflksj"
// }