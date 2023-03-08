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
    <div class="w-4/6 flex ph:w-full justify-center mt-3">
      <div class="w-9/12 ph:w-full">
        <CustomTabs ref="tabRef" class="mb-8" :isPc="isPc"></CustomTabs>
        <div class="w-full">
          <Carousel v-if="carouselList.length" :list="carouselList" class="mb-3"></Carousel>
          <ListItem v-for="item in Articlelist" :data="item" :key="item" @click="toDetail(item)">
          </ListItem>
        </div>
      </div>
      <div class=" w-3/12 ph:hidden pl-2">
        <SideBar></SideBar>
      </div>
    </div>
    <div class="w-full" ref="bottomRef">footer</div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
// import VirtualList from 'vue-virtual-scroll-list'
import ListItem from '../components/ListItem/ListItem.vue';
import CustomTabs from '../components/CustomTabs.vue';
import SearchBar from '../components/SearchBar.vue';
import SideBar from '../components/SideBar.vue';
import Carousel from '../components/ListItem/Carousel.vue';
import { useRoute, useRouter } from 'vue-router'
import utils from '../utils'
import { breakpointsTailwind, useBreakpoints, useElementVisibility } from '@vueuse/core'
import channelStore from '../store/channel';
const startRenderList = ref(false)
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const bottomRef = ref()
const tabRef = ref()
const targetIsVisible = useElementVisibility(bottomRef)
const tabIsVisible = useElementVisibility(tabRef)

const Articlelist = ref([])

const { query } = useRoute()

onMounted(() => {
  getChannels()
})

const getChannels = () => {
  channelStore.dispatch('getChannel').then(() => {
    getArticleList()
    // if(query.id) {
    //   channelStore.dispatch('setCurrentId', query.id).then(() => {
    //     getArticleList()
    //   })
    // } else {

    // }

  })
}
const getArticleList = () => {
  channelStore.dispatch('getArticleList')
  Articlelist.value = [...channelStore.state.articleList.data]
  startRenderList.value = true
}

watch(() => channelStore.state.articleList.data, (value) => {
  Articlelist.value = [...value];
})

const carouselList = ref([])
watch(() => channelStore.state.currentChannelId, (value) => {
  if (value) {
    const { title } = channelStore.state.channelList.data.find(i => i.id == value)
    if (title === '首页') {
      channelStore.dispatch('getCarousel', value).then(() => {
        carouselList.value = [...channelStore.state.carouselList]
        return
      })
    }
    carouselList.value = []
  }
})

watch(targetIsVisible, (value) => {
  if (startRenderList.value && value && !channelStore.state.articleListOver) {
    channelStore.dispatch('addPage').then(() => {
      getArticleList()
    })
  }
})

const router = useRouter()
const toDetail = (data) => {
  utils.jump(data, router)
}

const onSearch = (text) => {
  channelStore.dispatch('searchArticleList', text).then(() => {
    channelStore.dispatch('getArticleList')
  })
}

</script>