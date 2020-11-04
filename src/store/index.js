import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Promise from 'core-js/features/promise';

Vue.use(Vuex)

// const mainurl = 'http://localhost:8000';
const mainurl = 'https://crm.saeeclinic.com/api/public';


let state = {
  token: localStorage.getItem('token') || '',
}
const mutations = {
  set(state, [variable, value]) {
    state[variable] = value
  },
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, token) {
    state.status = 'success'
    state.token = token
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
  },
}
const actions = {
  login({ commit }, admin) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: `${mainurl}/api/admin/login`, data: admin, method: 'POST' })
        .then(resp => {
          const token = resp.data.access_token
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('auth_success', token)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.clear();
          delete axios.defaults.headers.common['Authorization']
          reject(err)
        })
    })
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: `${mainurl}/api/user/register`, data: user, method: 'POST' })
        .then(resp => {
          localStorage.clear();
          delete axios.defaults.headers.common['Authorization']
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.clear();
          delete axios.defaults.headers.common['Authorization']
          reject(err)
        })
    })
  },
  store_user({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: `${mainurl}/api/admin/store_user`, data: user, method: 'POST' })
        .then(resp => {
          commit("auth_success", localStorage.getItem('token'))
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('logout')
      localStorage.clear();
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
  storeme() {
    return new Promise((resolve) => {
      axios({ url: `${mainurl}/api/admin/me`, method: 'GET' })
        .then(resp => {
          localStorage.setItem('id', resp.data.id)
          localStorage.setItem('name', resp.data.name)
          localStorage.setItem('last_name', resp.data.last_name)
          localStorage.setItem('email', resp.data.email)
          localStorage.setItem('phone_number', resp.data.phone_number)
          localStorage.setItem('marketing_code', resp.data.marketing_code)
          localStorage.setItem('percentage_commission', resp.data.percentage_commission)
          resolve(resp)
        })
    })
  },
  services() {
    return new Promise((resolve) => {
      axios({ url: `${mainurl}/api/services`, method: 'GET', headers: { Authorization: "" } })
        .then((resp) => {
          resolve(resp)
        })
    })
  },
  users() {
    return new Promise((resolve) => {
      axios({ url: `${mainurl}/api/admin/get_users`, method: 'GET', headers: { Authorization: "" } })
        .then((resp) => {
          resolve(resp)
        })
    })
  },
  shifts({ commit }) {
    return new Promise((resolve) => {
      axios({ url: `${mainurl}/api/get_shifts`, method: 'POST', headers: { Authorization: "" } })
        .then((resp) => {
          commit("auth_success", localStorage.getItem('token'))
          resolve(resp)
        })
    })
  },
  searchShift({ commit }, shift) {
    return new Promise((resolve) => {
      axios({ url: `${mainurl}/api/get_shifts`, data: shift, method: 'POST', headers: { Authorization: "" } })
        .then((resp) => {
          commit("auth_success", localStorage.getItem('token'))
          resolve(resp)
        })
    })
  },
  resetpass({ commit }, national_code) {
    return new Promise((resolve) => {
      axios({ url: `${mainurl}/api/user/reset/password`, data: national_code, method: 'POST' })
        .then((resp) => {
          commit('success')
          resolve(resp)
        })
    })
  },
  storeFactor({ commit }, factor) {
    return new Promise((resolve) => {
      commit('auth_request')
      axios({ url: `${mainurl}/api/store_factor`, data: factor, method: 'POST', headers: { Authorization: "" } })
        .then(resp => {
          resolve(resp)
        })
    })
  },
  editProfile({ commit }, user) {
    return new Promise((resolve) => {
      commit('auth_request')
      axios({ url: `${mainurl}/api/user/update`, data: user, method: 'POST' })
        .then(resp => {
          commit("auth_success", localStorage.getItem('token'))
          resolve(resp)
        })
    })
  },
  factors({ commit }) {
    return new Promise((resolve) => {
      commit('auth_request')
      axios({ url: `${mainurl}/api/factors`, method: 'GET', headers: { Authorization: "" } })
        .then((resp) => {
          resolve(resp)
        })
    })
  },
}
const modules = {
}
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  axios
})
