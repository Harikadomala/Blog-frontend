import axios from 'axios';

const URL ='https://backend-project-lp11.onrender.com';

export const API = {
  userSignup: async (signupData) => {
    try {
      const response = await axios.post(`${URL}/api/v1/auth/signup`, signupData);
      return { isSuccess: true, data: response.data };
    } catch (error) {
      console.error('Signup error:', error.response?.data?.msg || error.message);
      return {
        isSuccess: false,
        error: error.response?.data?.msg || 'Signup failed. Please try again.',
      };
    }
  },

  userLogin: async (loginData) => {
    try {
      const response = await axios.post(`${URL}/api/v1/auth/login`, loginData);
      return { isSuccess: true, data: response.data };
    } catch (error) {
      console.error('Login error:', error.response?.data?.msg || error.message);
      return {
        isSuccess: false,
        error: error.response?.data?.msg || 'Login failed. Please try again.',
      };
    }
  }
};
