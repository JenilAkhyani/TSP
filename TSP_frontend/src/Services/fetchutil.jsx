import { showToast } from "../components/Toast/ShowToast";

const fetchUtil = async (url, method = 'GET', body = null, headers = {}) => {
    const baseUrl = 'http://localhost:5000';
    const fullUrl = `${baseUrl}${url}`;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(fullUrl, options);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      return data;
    } catch (error) {
      showToast(error.message);
      throw error;
    }
  };
  
  export default fetchUtil;
  