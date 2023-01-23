<script setup>
import { computed, ref } from "vue";

import store from "../../store";
import UserCard from "../../components/UserCard.vue";
import SkeletonUserList from "../../components/skeleton/SkeletonUserList.vue";
import Toast from "../../components/Toast.vue";
import Modal from "../../components/Modal.vue";

const users_loading = computed(() => store.state.users.loading);
const users = computed(() => store.state.users.data);
store.dispatch("getUsers");

const toastTrigger = ref(false);
const toastMsg = ref('')

function deleteUser(user) {
  if (confirm("Are you sure?")) {
    store.dispatch("deleteUser", user.id).then((res) => {
      if (res.status === 204) {
        toastTrigger.value = true;
        toastMsg.value = 'User deleted';
        setTimeout(() => (toastTrigger.value = false), 5000);
      }
    });
  }
}

function userSaved() {
  toastTrigger.value = true
  toastMsg.value = 'User Saved'
  setTimeout(() => (toastTrigger.value = false), 5000);
}
</script>

<template>
  <Toast v-if="toastTrigger" :message="toastMsg" @closeToast="toastTrigger = !toastTrigger" />

  <div class="flex justify-end pr-10">
    <button
      class="bg-sky-400 px-5 py-3 text-white rounded-md hover:bg-sky-500 duration-200"
      data-bs-toggle="modal"
      data-bs-target="#formModal"
    >
      Add User
    </button>
  </div>

  <section class="text-gray-600">
    <div class="container p-10 mx-auto">
      <div class="flex flex-wrap -m-4 text-center">
        <SkeletonUserList v-if="users_loading" />
        <UserCard
          v-else
          v-for="user of users.data"
          :key="user.id"
          :datas="user"
          @delete="deleteUser(user)"
        />
      </div>
    </div>
  </section>

  <Modal id="formModal" @userSaved="userSaved" />
</template>
