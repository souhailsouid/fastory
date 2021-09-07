import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import { store } from '../redux/store'

const UseCustomAxios = () => {
  const { token } = store.getState().user.currentUser.data

  const customAxios = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const interceptor = customAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        axios.interceptors.response.eject(interceptor)
        // devrai appeller une function de generation de token | je ne vais pas le faire ici
      }

      return Promise.reject(error)
      // eslint-disable-next-line comma-dangle
    }
  )
  return customAxios
}

export default UseCustomAxios
