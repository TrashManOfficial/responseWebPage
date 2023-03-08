<template>
  <div
    :class="`w-full flex bg-white h-20 items-center shadow-md z-50 justify-between ${tabIsVisible ? '' : 'fixed top-0'}`"
    v-if="isPc">
    <div class="w-3/4 flex items-center justify-between">
      <img class="m-2" src="../assets/logo.png">
      <CustomTabs class="justify-around" :isPc="isPc"></CustomTabs>
    </div>
  </div>
  <div ref="tabRef"></div>
  <div class="flex flex-col items-center">
    <div class="w-3/4 h-full flex flex-col items-center p-12  ph:bg-none ph:h-fit opacityLinear">
      <div class="w-full shadow-xl rounded-2xl">
        <img class="w-full rounded-2xl" :src="imgUrl" alt="">
        <div class="text-3xl p-8 flex justify-between items-center">
          <div>{{ ArticleDetail.title }}</div>
          <div class="text-lg text-gray-700">{{ util.timeFormat(ArticleDetail.docPubTime) }}</div>
        </div>
      </div>
      <!-- <div class="h-16 w-full ph:h-fit flex justify-center">
      </div> -->
    </div>
    <div class="w-3/4 flex ph:w-full justify-center mt-3">
      <div class="w-9/12 ph:w-full">
        <CustomTabsSpecial ref="tabRef" class="mb-8" :isPc="isPc" :data="ArticleDetail"></CustomTabsSpecial>
        <div class="w-full">
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
import { ref, watch, onUnmounted } from 'vue';
import ListItem from '../components/ListItem/ListItem.vue';
import CustomTabs from '../components/CustomTabs.vue';
import CustomTabsSpecial from '../components/CustomTabsSpecial.vue';
import util from '../utils'
import SideBar from '../components/SideBar.vue';
import { breakpointsTailwind, useBreakpoints, useElementVisibility } from '@vueuse/core'
import channelStore from '../store/channel';
import { useRoute, useRouter } from 'vue-router'
const { query } = useRoute()
const router = useRouter()
const startRenderList = ref(false)
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const bottomRef = ref()
const tabRef = ref()
const targetIsVisible = useElementVisibility(bottomRef)
const tabIsVisible = useElementVisibility(tabRef)

const imgUrl = ref('')

const Articlelist = ref([])
const ArticleDetail = ref({})

const getChannels = () => {
  channelStore.dispatch('getChannel').then(() => {
    // channelStore.dispatch('setCurrentId','not')
    getSpecialDetail()
  })
}
const getSpecialDetail = () => {
  channelStore.dispatch('getArticleDetails', query.docid).then(() => {
    ArticleDetail.value = channelStore.state.articleDetail
    imgUrl.value = channelStore.state.articleDetail.metaInfo.thumbnails[0].split('_')[0] + '.jpg'
    channelStore.dispatch('setCurrentDocId', query.docid).then(() => {
      startRenderList.value = true
    })
    // channelStore.dispatch('setCurrentGroupId',query.docid)
  })
}
const getArticleList = () => {
  channelStore.dispatch('getSpecialList')
  Articlelist.value = [...channelStore.state.articleList.data]
  startRenderList.value = true
}
getChannels()

watch(() => channelStore.state.articleList.data, (value) => {
  Articlelist.value = [...value];
})

watch(targetIsVisible, (value) => {
  if (startRenderList.value && value && !channelStore.state.articleListOver) {
    channelStore.dispatch('addPage').then(() => {
      getArticleList()
    })
  }
})

onUnmounted(() => {
  channelStore.dispatch('setCurrentId', '')
})

const toDetail = (data) => {
  util.jump(data, router)
}
</script>
<style scoped>
.opacityLinear {
  background: linear-gradient(to bottom, rgba(22, 157, 170, 1) 10.0%, rgb(255, 255, 255) 60%);
}
</style>