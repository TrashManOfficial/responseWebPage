import axios from "axios"

const axiosReqres = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

export default axiosReqres