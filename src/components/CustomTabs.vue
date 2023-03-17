<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import DropDownList from './DropDownList.vue';
import StrongTitle from './StrongTitle.vue';
import channelStore from '../store/channel';
import { useRouter } from 'vue-router'
import { XMarkIcon } from '@heroicons/vue/24/solid'
const router = useRouter()

const { state } = channelStore

const DEFAULT_KEY = 'showmore'
const DEFAULT_LIST_LENGTH = 7

const props = defineProps({
  isPc: Boolean,
})
const tabList = ref([])

const showModal = ref(false)


onMounted(() => {
  tabList.value = [...state.channelList.data.map(i => {
    return {
      id: i.id,
      name: i.title
    }
  })]
  currentId.value = state.currentChannelId
})

watch(() => state.channelList.data, () => {
  tabList.value = [...state.channelList.data.map(i => {
    return {
      id: i.id,
      name: i.title
    }
  })]
})

const DEFAULT_LENGTH = computed(() => {
  return DEFAULT_LIST_LENGTH
  // return props.isPc ? DEFAULT_LIST_LENGTH : tabList.value.length
})

//监听屏幕变化，改变tab显示形式
watch(() => props.isPc, (value) => {
  DEFAULT_LENGTH.value = value ? DEFAULT_LIST_LENGTH : tabList.value.length;
  tabList.value = [...tabList.value]
})

const currentId = ref('')

watch(() => state.currentChannelId, (value) => {
  currentId.value = value
})

const setCurrentId = (id) => {
  channelStore.dispatch('setCurrentId', id).then(() => {
    window.scrollTo(0, 0)
    channelStore.dispatch('getArticleList')
  })
  router.push({ path: '/home', query: { id: id } })
}

const showList = computed(() => {
  return [...tabList.value.slice(0, DEFAULT_LENGTH.value), { id: DEFAULT_KEY, name: '更多' }]
})

const hiddenList = computed(() => {
  if (tabList.value.length < DEFAULT_LENGTH.value) {
    return []
  }
  return tabList.value.slice(DEFAULT_LENGTH.value)
})

const hiddenListClick = (data) => {
  //交换下拉列表的数据和显示tab的末尾数据
  channelStore.dispatch('exchangeItem', { index: DEFAULT_LENGTH.value, data })
  setCurrentId(data.id)
  switchShowModal(false)
  // debugger
}

const switchShowModal = (flag) => {
  if (flag.value) {
    showModal.value = flag.value
  } else {
    showModal.value = !showModal.value
  }
}
</script>
<template>
  <div class="w-full flex ph:overflow-x-auto justify-between scrollBar ph:pr-10">
    <div class="flex justify-start" v-for="item in showList">
      <StrongTitle :name="item.name" :isCurrent="currentId === item.id" v-if="item.id !== DEFAULT_KEY"
        @click="setCurrentId(item.id)">
      </StrongTitle>
      <div v-else-if="hiddenList.length && isPc" class="w-fit cursor-pointer">
        <DropDownList :list="hiddenList" @itemClick="hiddenListClick">
          <div class="font-trsFontFace text-2xl px-1 break-keep font-light">
            {{ item.name }}</div>
        </DropDownList>
      </div>
    </div>
    <div v-if="!isPc" class="flex-1 right-0 top-[68px] bg-white ph:right-0 ph:absolute ph:top-[68px]"
      style="border-left: 1px solid gray;" @click="switchShowModal">
      <div :class="`font-trsFontFace text-xl px-1 break-keep`">
        更多
      </div>
    </div>
    <div v-if="showModal" class="fixed left-0 h-80 w-full bg-white bottom-0 rounded-t-lg z-[120] p-3 shadow-xl"
      style="box-shadow: 0 -5px 6px #c1c1c1;">
      <div class="flex w-full justify-between mb-3">
        <StrongTitle :name="`更多栏目`" :isCurrent="true">更多栏目</StrongTitle>
        <XMarkIcon class="w-5 h-5" @click="switchShowModal(false)"></XMarkIcon>
      </div>
      <div class="w-full h-72 flex justify-start flex-wrap overflow-y-scroll">
        <div :title="item.name" v-for="item in hiddenList" @click="hiddenListClick(item)" href="#"
          class="min-w-24 p-2 text-center overflow-hidden justify-center text-ellipsis whitespace-nowrap items-center text-xl text-gray-600  transition-colors duration-200 transform hover:bg-gray-100">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.scrollBar::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>