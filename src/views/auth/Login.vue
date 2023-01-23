<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { XMarkIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'

import Alert from '../../components/auth/Alert.vue'
import store from '../../store'

const router = useRouter()

const user = {
  email: '',
  password: ''
}

const submitting = ref(false)

let errorMessage = ref()
function login() {
  submitting.value = true

  store.dispatch('login', user)
    .then(() => {
      submitting.value = false
      router.push({ name: 'users' })
    })
    .catch(err => {
      submitting.value = false
      errorMessage.value = err.response.data.error
    })
}
</script>

<template>
  <div
    class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
    <p class="text-center font-semibold mx-4 mb-0">Login</p>
  </div>
  <Alert v-if="errorMessage">
    {{ errorMessage }}
    <span @click="errorMessage = ''" class="w-8 h-8 rounded-full transition-colors cursor-pointer p-2 hover:bg-black/20">
      <XMarkIcon />
    </span>
  </Alert>
  <form @submit.prevent="login">
    <!-- Email input -->
    <div class="mb-6">
      <input type="email" placeholder="Email address" v-model="user.email"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required />
    </div>

    <!-- Password input -->
    <div class="mb-6">
      <input type="password" placeholder="Password" v-model="user.password"
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required />
    </div>

    <div class="block lg:flex justify-between text-center lg:text-left mb-10">
      <button type="submit"
        class="w-full lg:w-fit flex justify-center items-center gap-3 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        :class="[submitting ? '!bg-blue-400' : '' ]">
        <ArrowPathIcon v-if="submitting" class="w-4 h-4 animate-spin" />
        Login
      </button>
      <p class="text-sm font-semibold mt-2 pt-1 mb-0">
        Don't have an account?
        <router-link :to="{ name: 'register' }"
          class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
          Register
        </router-link>
      </p>
    </div>
  </form>
</template>