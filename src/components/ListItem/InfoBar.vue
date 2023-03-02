<script setup>
const props = defineProps({
  data:{
    type:Object
  }
})
</script>
<template>
  <div class="flex justify-start text-gray-500">
    <div class="mr-4">{{ data.source }}</div>
    <div class="mr-4 flex items-center">
      <img src="../../assets/comment.png" class="h-5 w-6" />
      <div>评论：<span class="text-primary">{{ data.comment }}</span></div>
    </div>
    <div class="mr-4">{{ data.time }}</div>
  </div>
</template>