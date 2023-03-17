<template>
  <div
    :class="`w-full flex bg-white h-20 items-center shadow-md z-50 justify-center ${tabIsVisible ? '' : 'fixed top-0'}`">
    <div class="w-[1500px] flex items-center justify-between">
      <img class="m-2 h-12" src="../assets/logo.png" alt="新快网logo" @click="toHome">
      <CustomTabs class="justify-around" :isPc="isPc"></CustomTabs>
    </div>
    <div class="w-1/4 mx-2">
      <SearchBar @onSearch="onSearch">
      </SearchBar>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="w-3/4 flex ph:w-full justify-center mt-3 ">
      <ShareBar></ShareBar>
      <div class="max-w-[750px] pr-6 flex flex-col ph:w-full">
        <div>
          <div class="text-3xl font-black my-6" ref="tabRef">{{ ArticleDetail.title }}</div>
          <InfoBar class="mb-3" :data="{ source: ArticleDetail?.metaInfo?.source, time: ArticleDetail.docPubTime }">
          </InfoBar>
        </div>
        <div v-if="type === 1" v-html="str" class="text-justify contentSpe">
        </div>
        <CarouselDetail v-if="type === 2" :list="imgList" class="w-full">
        </CarouselDetail>
        <div v-if="type === 7">
          <video :poster="videoDetail.coverPic" controls class="m-auto">
            <source :src="videoDetail.url" type="video/mp4">
          </video>
          <div v-html="str">
          </div>
        </div>
        <div>
          <div class="text-gray-400">
            <div v-if="ArticleDetail?.metaInfo?.responsileEditor || ArticleDetail?.metaInfo?.editor">
              责编：{{ ArticleDetail?.metaInfo?.responsileEditor || ArticleDetail?.metaInfo?.editor }}</div>
            <div v-if="ArticleDetail?.metaInfo?.proofread">校对：{{ ArticleDetail?.metaInfo?.proofread }}</div>
          </div>
          <hr />
          <div class="my-4 text-gray-400">
            特别声明：以上内容版权均属广东新快报社所有（注明其他来源的内容除外），任何媒体、网站或个人未经本报协议授权不得转载、链接、转贴或以其他方式复制发布/发表。协议授权转载联系：（020）87133906。
          </div>
          <hr />
        </div>
        <div v-if="ArticleDetail?.metaInfo?.relatedDoc?.length">
          <StrongTitle :name="'推荐阅读'" :isCurrent="true" class="mb-4"></StrongTitle>
          <div v-for="item in ArticleDetail?.metaInfo?.relatedDoc" @click="toDetail(item)">
            <ListItem :plainData="item"></ListItem>
          </div>
        </div>
        <div v-if="commentList.length">
          <StrongTitle :name="`评论回复（${commentList.length}）`" :isCurrent="true" class="my-4"></StrongTitle>
          <div v-for="item in commentList">
            <div class="flex items-start w-full">
              <div><img class="h-12 w-12 rounded-full" :src="item.headUrl" alt=""></div>
              <div class="w-full ml-5">
                <div class="flex justify-between text-lg items-center">
                  <div class="text-xl font-bold">{{ item.publisherFullname }}</div>
                  <div>{{ `点赞数：` + item.favoriteCount }}</div>
                </div>
                <div class="mt-3 mb-4">{{ item.content }}</div>
                <div>
                  <div>{{ utils.timeFormat(item.crDate) }}</div>
                  <div></div>
                </div>
              </div>
            </div>
            <!-- <ListItem :plainData="item"></ListItem> -->
          </div>
        </div>
      </div>
      <div class=" w-3/12 ph:hidden pl-2">
        <SideBar></SideBar>
      </div>
    </div>
  </div>
  <ScrollToTop v-if="!tabIsVisible"></ScrollToTop>
  <div class="w-full">
    <Footer></Footer>
  </div>
</template>
<script setup>
import CustomTabs from '../components/CustomTabs.vue';
import StrongTitle from '../components/StrongTitle.vue';
import ListItem from '../components/ListItem/ListItem.vue';
import SearchBar from '../components/SearchBar.vue';
import SideBar from '../components/SideBar.vue';
import InfoBar from '../components/ListItem/InfoBar.vue';
import Footer from '../components/Footer.vue';
import ShareBar from '../components/ShareBar.vue';

import ScrollToTop from '../components/ScrollToTop.vue';
import CarouselDetail from '../components/ListItem/CarouselDetail.vue';
import { ref, onUnmounted, onBeforeMount } from 'vue'
import { breakpointsTailwind, useBreakpoints, useElementVisibility } from '@vueuse/core'
import channelStore from '../store/channel';
import { useRoute, useRouter } from 'vue-router'
import utils from '../utils'
import axios from "axios"
const tabRef = ref()
const tabIsVisible = useElementVisibility(tabRef)
const { query } = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = ref(breakpoints.greater('md'))
const ArticleDetail = ref({})
const str = ref('')
const imgList = ref([])
const videoDetail = ref({})
const type = ref(undefined)
const router = useRouter()

const commentList = ref([])

const onSearch = (text) => {
  const herf = router.resolve({
    path:'search',
    query:{
      keyword:text
    }
  })
  window.open(herf.href,'_blank')
}

onBeforeMount(() => {
  redirectToMobile()
})

const redirectToMobile = () => {
  if (!isPc.value) {
    window.location.href = `https://www.xkb.com.cn/fundhtml/#/details?id=${query.id}`;
  }
}


const toDetail = (data) => {
  const temp = {
    docId: data.docId,
    id: data.docId,
    metaInfo: {
      listStyle: data.listStyle,
    }
  }
  utils.jump(temp, router, isPc)
}
const getChannels = () => {
  channelStore.dispatch('getChannel').then(() => {
    const id = channelStore.state.channelListRaw.data.find(i => i.title == '专题').id
    channelStore.dispatch('getArticleList', id)
  })
}
getChannels()


const getArticleDetail = () => {
  channelStore.dispatch('getArticleDetails', query.id).then(() => {
    handleArticle(channelStore.state.articleDetail)
  })
  channelStore.dispatch('getCommentList', query.id).then(() => {
    commentList.value = channelStore.state.commentList
  })
}
getArticleDetail()


const getCommentList = () => {
  channelStore.dispatch('getCommentList', query.id).then(() => {
    commentList.value = channelStore.state.commentList
  })
}

const handleArticle = (data) => {
  ArticleDetail.value = data
  type.value = data.docType + 0
  //新闻
  if (type.value === 1) {
    const url = data.contentUrl
    ArticleDetail.value = channelStore.state.articleDetail
    if (url) {
      axios.get(url).then((res) => {
        str.value = res.data.htmlContent
      }).catch(e => console.log(e))
    }
    return
  }
  //图集
  if (type.value === 2) {
    imgList.value = data.metaInfo.appendixs
    // return
  }

  if (type.value === 7) {
    str.value = data.metaInfo.videoDoc.htmlContent
    videoDetail.value = data.metaInfo.videoDoc
    // return
  }


}

const toHome = () => {
  const href = router.resolve({
    path:'/home'
  })
  window.open(href.href,'_blank')
}

</script>
<style>
.contentSpe iframe {
  min-height: 410px;
}
</style>