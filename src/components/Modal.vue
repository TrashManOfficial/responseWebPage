<script setup>
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

import store from "../store"

const route = useRoute()
const router = useRouter()

const emit = defineEmits()

let user = ref({
  first_name: "",
  last_name: "",
  email: "",
})

watch(
  () => store.state.user_detail.data,
  (newVal) => {
    user.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    }
  }
)

if (route.params.id) {
  store.dispatch("getUser", route.params.id)
}

function saveUser() {
  store.dispatch('saveUser', user.value)
    .then(() => {
      emit('userSaved')
    })
}
</script>

<template>
  <div
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <form @submit.prevent>
          <div
            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
          >
            <h5
              class="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              {{ route.params.id ? "Update" : "Add" }} User
            </h5>
            <button
              type="button"
              class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          
          <div class="p-5">
            <div class="flex gap-5">
              <div class="form-group">
                <label
                  for="first-name"
                  class="form-label inline-block mb-2 text-gray-700"
                  >First Name</label
                >
                <input
                  type="text"
                  name="first-name"
                  v-model="user.first_name"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none"
                  aria-describedby="emailHelp"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group">
                <label
                  for="last-name"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Last Name</label
                >
                <input
                  type="text"
                  name="last-name"
                  v-model="user.last_name"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="form-group mt-4">
              <label
                for="email"
                class="form-label inline-block mb-2 text-gray-700"
                >Email</label
              >
              <input
                type="email"
                name="email"
                v-model="user.email"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none"
                placeholder="Email"
              />
            </div>
          </div>

          <div
            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
          >
            <button
              type="button"
              class="px-6 py-2.5 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="px-6 py-2.5 bg-sky-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-600 hover:shadow-lg focus:bg-sky-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-600 active:shadow-lg transition duration-150 ease-in-out ml-1"
              @click="saveUser"
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
