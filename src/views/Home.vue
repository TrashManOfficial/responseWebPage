<template>
  <div class="w-full flex fixed top-0 bg-white h-20 items-center shadow-md z-50 justify-between"
    v-if="!tabIsVisible && isPc">
    <div class="w-3/4 flex items-center justify-between">
      <img class="m-2" src="../assets/logo.png" alt="新快网logo">
      <CustomTabs ref="tabRef" class="justify-around" :isPc="isPc"></CustomTabs>
    </div>
    <div class="w-1/4 mx-2">
      <SearchBar @onSearch="onSearch">
      </SearchBar>
    </div>
  </div>
  <div class="flex flex-col items-center">
    <div class="w-full h-[380px] flex items-center bg-searchBarBackground ph:bg-none ph:h-fit">
      <div class="h-16 w-full ph:h-fit flex justify-center">
        <SearchBar @onSearch="onSearch" class="w-1/2 ph:w-full">
        </SearchBar>
      </div>
    </div>
    <div class="w-3/4 flex ph:w-full justify-center mt-3">
      <div class="w-9/12 ph:w-full">
        <CustomTabs ref="tabRef" class="mb-3" :isPc="isPc"></CustomTabs>
        <div class="w-full">
          <Carousel v-if="carouselList.length" :list="carouselList" class="mb-3"></Carousel>
          <ListItem v-for="item in Articlelist" :data="item" :key="item">
          </ListItem>
        </div>
      </div>
      <div class=" w-3/12 ph:hidden pl-2">
        <div class="flex flex-col">
          <StrongTitle :name="'轻报纸'" :isCurrent="true" class="mb-3"></StrongTitle>
          <a href="https://epaper.xkb.com.cn/" target="_blank">
            <img src="https://epaper.xkb.com.cn/index.php?s=/index/firstedition/" class="w-full h-full rounded-lg" />
          </a>
        </div>
        <div class="flex flex-col">
          <StrongTitle :name="'专题'" :isCurrent="true" class="mb-3"></StrongTitle>
          <div class="bg-teal-50 rounded-xl p-3">
            <div class="mr-4 flex items-center mb-2 cursor-pointer" v-for="item in featuresList">
              <img src="../assets/listicon.png" class="h-3 w-3" />
              <div>{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <StrongTitle :name="'乡村振兴日记'" :isCurrent="true" class="mb-3"></StrongTitle>
          <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            class="w-full h-[425px] object-cover rounded-lg" />
        </div>
      </div>
    </div>
    <div class="w-full" ref="bottomRef">footer</div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
// import VirtualList from 'vue-virtual-scroll-list'
import ListItem from '../components/ListItem/ListItem.vue';
import CustomTabs from '../components/CustomTabs.vue';
import SearchBar from '../components/SearchBar.vue';
import StrongTitle from '../components/StrongTitle.vue';
import Carousel from '../components/ListItem/Carousel.vue';
import { breakpointsTailwind, useBreakpoints, useElementVisibility } from '@vueuse/core'
import channelStore from '../store/channel';
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const bottomRef = ref()
const tabRef = ref()
const targetIsVisible = useElementVisibility(bottomRef)
const tabIsVisible = useElementVisibility(tabRef)

const Articlelist = ref([])

const getChannels = () => {
  channelStore.dispatch('getChannel').then(() => {
    getArticleList()
    getFeatures()
  })
}
const getArticleList = () => {
  channelStore.dispatch('getArticleList')
  Articlelist.value = [...channelStore.state.articleList.data]
}
getChannels()

watch(() => channelStore.state.articleList.data, (value) => {
  Articlelist.value = [...value];
})

const carouselList = ref([])
watch(() => channelStore.state.currentChannelId, (value) =>{
  const {title} = channelStore.state.channelList.data.find(i => i.id == value)
  if(title === '首页') {
    channelStore.dispatch('getCarousel',value).then(() => {
      carouselList.value = [...channelStore.state.carouselList]
      return
      // console.log('1111',carouselList.value);
    })
  }
  carouselList.value = []
})

const featuresList = ref([])
const getFeatures = () => {
  const id = channelStore.state.channelList.data.find(i => i.title == '专题').id
  channelStore.dispatch('getArticleList', id).then(() => {
    featuresList.value = channelStore.state.featuresList
  })
}

watch(targetIsVisible, (value) => {
  // console.log('cga');
  if (value && !channelStore.state.articleListOver) {
    channelStore.dispatch('addPage').then(() => {
      getArticleList()
    })
  }
})

const onSearch = (text) => {
  console.log(text);
}

</script>