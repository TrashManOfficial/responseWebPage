<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import DropDownList from './DropDownList.vue';
import StrongTitle from './StrongTitle.vue';
import channelStore from '../store/channel';

const { state } = channelStore

const DEFAULT_KEY = 'showmore'

const props = defineProps({
  isPc: Boolean,
})
const tabList = ref([])

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
  return props.isPc ? 6 : tabList.value.length
})

//监听屏幕变化，改变tab显示形式
watch(() => props.isPc, (value) => {
  DEFAULT_LENGTH.value = value ? 6 : tabList.value.length;
  tabList.value = [...tabList.value]
})

const currentId = ref('')

watch(() => state.currentChannelId, (value) => {
  currentId.value = value
})

const setCurrentId = (id) => {
  channelStore.dispatch('setCurrentId', id).then(() => {
    channelStore.dispatch('getArticleList')
  })
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
}
</script>
<template>
  <div class="w-full flex ph:overflow-x-auto justify-between">
    <div class="flex justify-start" v-for="item in showList">
      <StrongTitle :name="item.name" :isCurrent="currentId === item.id" v-if="item.id !== DEFAULT_KEY"
        @click="setCurrentId(item.id)">
      </StrongTitle>
      <div v-else-if="hiddenList.length" class="w-fit cursor-pointer">
        <DropDownList :list="hiddenList" @itemClick="hiddenListClick">
          <div class="font-FZ text-2xl px-1 break-keep font-light">
            {{ item.name }}</div>
        </DropDownList>
      </div>
    </div>
    <div v-if="!isPc" class="flex-1">
      <div :class="`font-FZ text-2xl px-1 break-keep`">
        更多
      </div>
    </div>
  </div>
</template>