import axios from 'axios'
import 'dotenv/config'
import { config } from '../utils/customLocalStorage'

const dynamicAPI = async (method, url, obj = {}) => {
  try {
    switch (method) {
      case 'get':
        return await axios
          .get(`http://${process.env.SERVER_ADDR}:5000${url}`, config())
          .then((res) => res.data)

      case 'post':
        return await axios
          .post(`http://${process.env.SERVER_ADDR}:5000${url}`, obj, config())
          .then((res) => res.data)

      case 'put':
        return await axios
          .put(`http://${process.env.SERVER_ADDR}:5000${url}`, obj, config())
          .then((res) => res.data)

      case 'delete':
        return await axios
          .delete(`http://${process.env.SERVER_ADDR}:5000${url}`, config())
          .then((res) => res.data)
    }
  } catch (error) {
    throw error.response.data.error
  }
}

export default dynamicAPI
