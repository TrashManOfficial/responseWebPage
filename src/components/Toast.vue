<script setup>

const props = defineProps({
  message: String
})

</script>

<template>
  <div class="fixed top-5 right-5 bg-sky-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block overflow-hidden mb-3 animate-slide-down" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="true">
    <div class="bg-sky-500 flex justify-between items-center py-4 px-3 bg-clip-padding">
      <p class="font-bold text-white flex items-center">
        {{ message }}
      </p>
      <div class="flex items-center">
        <button @click="$emit('closeToast')" type="button" class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:opacity-100 duration-200" data-mdb-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>