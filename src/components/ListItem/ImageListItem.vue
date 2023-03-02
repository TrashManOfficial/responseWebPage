<script setup>
import InfoBar from './InfoBar.vue';
const props = defineProps({
  list: {
    type: Array,
    default: [],
    required: true
  }
})
</script>
<template>
  <div class="w-full h-44">
    <div class="w-full flex">
      <img v-for="item in list" :src="item.src" :alt="item.name" class="w-1/3 h-44 object-cover rounded-lg"/>
    </div>
    <InfoBar :data="{ source: '111', comment: 123, time: '2022-12' }"></InfoBar>
  </div>
</template>