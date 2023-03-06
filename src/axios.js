import axios from "axios"

const axiosReqres = axios.create({
  baseURL: `/xkbapp/fundapi/article/api`,
  headers: {
    "siteId":import.meta.env.DEV ? 19 : 35,
    'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTI3MDUyNzEwMEBpbmV0IiwiaWF0IjoxNjc3NzQ4MDY5LCJleHAiOjE2NzgzNTI4NjksImF1dGhUeXBlIjoyfQ.jqFF7g6d0_LCo27SymhwexCPBtFDbx-o1cuyO6ERzvI`
  }
})

export default axiosReqres