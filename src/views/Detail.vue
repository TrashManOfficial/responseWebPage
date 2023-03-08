<template>
  <div class="w-full flex bg-white h-20 items-center shadow-md z-50 justify-between">
    <div class="w-3/4 flex items-center justify-between">
      <img class="m-2" src="../assets/logo.png" alt="新快网logo">
      <CustomTabs class="justify-around" :isPc="isPc"></CustomTabs>
    </div>
    <div class="w-1/4 mx-2">
      <SearchBar @onSearch="onSearch">
      </SearchBar>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="w-3/4 flex ph:w-full justify-center mt-3">
      <div class="w-9/12 ph:w-full">
        <div v-html="str"></div>
      </div>
      <div class=" w-3/12 ph:hidden pl-2">
        <SideBar></SideBar>
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomTabs from '../components/CustomTabs.vue';
import SearchBar from '../components/SearchBar.vue';
import SideBar from '../components/SideBar.vue';
import { ref, onUnmounted } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import channelStore from '../store/channel';
import { useRoute } from 'vue-router'
import axios from "axios"
const { query } = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const Articlelist = ref([])
const str = ref('')


const getChannels = () => {
  channelStore.dispatch('getChannel').then(() => {
    getArticleList()
  })
}
const getArticleList = () => {
  channelStore.dispatch('getArticleList')
  Articlelist.value = [...channelStore.state.articleList.data]
}
getChannels()

const getArticleDetail = () => {
  channelStore.dispatch('getArticleDetails', query.id).then(() => {
    const url = channelStore.state.articleDetail.contentUrl
    if (url) {
      axios.get(url).then((res) => {
        str.value = res.data.htmlContent
      }).catch(e => console.log(e))
      // channelStore.dispatch('getArticleContent',url)     
    }
  })
}
getArticleDetail()
onUnmounted(() => {
  channelStore.dispatch('setCurrentId', '')
})
</script>