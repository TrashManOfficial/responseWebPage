<script setup>
import { ref, watch } from 'vue'
import Carousel from './Carousel.vue';
import NewsItem from './NewsItem.vue';
import ImageListItem from './ImageListItem.vue';
const list = ref([
  {
    name: '1',
    src: 'https://flowbite.com/docs/images/carousel/carousel-1.svg',
  },
  {
    name: '2',
    src: 'https://flowbite.com/docs/images/carousel/carousel-2.svg',
  },
  {
    name: '3',
    src: 'https://flowbite.com/docs/images/carousel/carousel-3.svg',
  }
])
</script>
<template>
  <Carousel :list="list" class="mb-4" />
  <NewsItem :data="list[0]" class="mb-4"></NewsItem>
  <NewsItem :data="list[0]" class="mb-4"></NewsItem>
  <ImageListItem :list="list" class="mb-4"></ImageListItem>
</template>