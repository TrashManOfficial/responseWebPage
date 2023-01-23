import { createStore } from "vuex"
import axiosReqres from '../axios'

const store = createStore({
  state: {
    auth_user: {
      token: sessionStorage.getItem("TOKEN")
    },
    users: {
      loading: false,
      data: {}
    },
    user_detail: {
      loading: false,
      data: {}
    }
  },
  actions: {
    async login({ commit }, user) {
      const loginUser = await axiosReqres.post('/login', user)
      try {
        commit('AUTH_USER', loginUser)
      } catch(err) {
        throw err
      }
    },
    async register({ commit }, user) {
      const registerUser = await axiosReqres.post('/register', user)
      try {
        commit('AUTH_USER', registerUser)
      } catch(err) {
        throw err
      }
    },
    async getUsers({ state, commit }) {
      state.users.loading = true
      const allUsers = await axiosReqres('/users')
      try {
        commit('GET_USERS', allUsers)
      } catch(err) {
        throw err
      }
    },
    async getUser({ state, commit }, id) {
      state.user_detail.loading = true
      const detailUser = await axiosReqres(`/users/${id}`)
      try {
        commit('DETAIL_USER', detailUser.data.data)
      } catch(err) {
        throw err
      }
    },
    async saveUser({ state, commit }, user) {
      state.user_detail.loading = true
      let response
      if (user.id) {
        response = await axiosReqres.put(`/users/${user.id}`, user)
        try {
          commit('DETAIL_USER', response.data)
        } catch(err) {
          throw err
        }
      } else {
        response = await axiosReqres.post('/users', user)
        try {
          commit('DETAIL_USER', response.data)
        } catch(err) {
          throw err
        }
      }
    },
    deleteUser(id) {
      return axiosReqres.delete(`/users/${id}`)
    }
  },
  mutations: {
    AUTH_USER: (state, authUser) => {
      state.auth_user.token = authUser.data.token
      sessionStorage.setItem("TOKEN", authUser.data.token)
    },
    GET_USERS: (state, users) => {
      state.users.loading = false
      state.users.data = users.data
    },
    DETAIL_USER: (state, users) => {
      state.user_detail.loading = false
      state.user_detail.data = users
    },
  }
})

export default store