import axios from 'axios';
import { store } from '../redux/store';

const UseCustomAxios = () => {
  const token = store.getState().user.currentUser.data.token;

  const customAxios = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const interceptor = customAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        axios.interceptors.response.eject(interceptor);
        // devrai appeller une function de generation de token | je ne vais pas le faire ici
      }

      return Promise.reject(error);
    }
  );
  return customAxios;
};

export default UseCustomAxios;
