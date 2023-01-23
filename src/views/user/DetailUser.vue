<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import store from "../../store";
import Modal from "../../components/Modal.vue";
import Toast from "../../components/Toast.vue";

const route = useRoute();

const user_detail = computed(() => store.state.user_detail.data);
store.dispatch("getUser", route.params.id);

const toastTrigger = ref(false);
const toastMsg = ref('')

function userUpdated() {
  toastTrigger.value = true
  toastMsg.value = 'User Updated'
  setTimeout(() => (toastTrigger.value = false), 5000);
}
</script>

<template>
  <Toast v-if="toastTrigger" :message="toastMsg" @closeToast="toastTrigger = !toastTrigger" />

  <div class="w-full h-[250px]">
    <img
      src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
      class="w-full h-full"
    />
  </div>
  <div class="flex flex-col items-center -mt-20">
    <img
      :src="user_detail.avatar"
      class="w-40 border-4 border-white rounded-full"
    />
    <div class="flex items-center space-x-2 mt-2">
      <p class="text-2xl">
        {{ user_detail.first_name }} {{ user_detail.last_name }}
      </p>
    </div>
    <p class="text-gray-700">{{ user_detail.email }}</p>
  </div>
  <div class="flex items-center justify-center gap-3 px-8 mt-2">
    <button
      class="flex items-center bg-sky-600 hover:bg-sky-700 text-gray-100 px-4 py-2 rounded text-sm transition duration-100"
      data-bs-toggle="modal"
      data-bs-target="#formModal"
    >
      Update
    </button>
  </div>

  <Modal id="formModal" @userSaved="userUpdated" />
</template>
