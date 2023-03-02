<script setup>
import InfoBar from './InfoBar.vue';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>
<template>
  <div class="w-full h-32 flex justify-between">
    <div class="flex flex-col justify-between">
      <div class="text-xl font-medium cursor-pointer hover:text-primary">粤桂协作｜驻忻城县工作组赴信宜市实地考察调研</div>
      <InfoBar :data="{source:'111',comment:123,time:'2022-12'}"></InfoBar>
    </div>
    <img :src="data.src" class="h-full w-44 rounded-lg object-cover" />
  </div>
</template>