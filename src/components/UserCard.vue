<script setup>

const props = defineProps({
  datas: Object
})

const emit = defineEmits(['delete'])

</script>

<template>
  <div class="p-4 sm:w-1/2 lg:w-1/3 w-full">
    <div class="flex flex-col items-center justify-between p-4 rounded-lg shadow-lg shadow-sky-100 hover:bg-gray-50 duration-200">
      <div class="bg-gradient-to-tr from-sky-500 to-sky-400 w-32 h-32 rounded-full overflow-hidden flex justify-center items-center border border-sky-400">
        <img :src="datas.avatar" :alt="datas.first_name" class="w-full object-cover">
      </div>
      <div>
        <h2 class="text-gray-900 text-lg font-bold">{{ datas.first_name }} {{ datas.last_name }}</h2>
        <p class="text-sm text-gray-600">{{ datas.email }}</p>
        <div class="flex justify-center gap-3 mt-6">
          <router-link :to="{ name: 'users-detail', params: { id: datas.id } }" class="block text-sm px-4 py-2 bg-sky-400 text-white rounded-lg tracking-wider hover:bg-sky-500 outline-none duration-200">
            Detail
          </router-link>
          <button @click="emit('delete', user)" class="block text-sm px-4 py-2 bg-rose-500 text-white rounded-lg tracking-wider hover:bg-rose-600 outline-none duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>