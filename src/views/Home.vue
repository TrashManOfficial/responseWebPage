<template>
  <div class="w-full flex fixed top-0 bg-white h-14 items-center shadow-md z-50" v-if="!tabIsVisible && isPc">
    <CustomTabs :list="list" ref="tabRef"></CustomTabs>
    <div class="mt-2 mb-2 border-2 pl-4 flex justify-between rounded-3xl bg-white w-2/4 ph:w-full">
      <input class="flex-grow outline-none text-gray-600 focus:text-blue-600" type="text"
        placeholder="Search Customer..." />
      <img class="h-12 w-12 cursor-pointer" src="../assets/search.png" alt="搜索">
    </div>
  </div>
  <div class="flex flex-col items-center">
    <div class="w-full h-[380px] flex items-center bg-searchBarBackground ph:bg-none ph:h-fit">
      <div class="h-16 w-full ph:h-fit flex justify-center">
        <div class="mt-2 mb-2 border-2 pl-4 flex justify-between rounded-3xl bg-white w-2/4 ph:w-full">
          <input class="flex-grow outline-none text-gray-600 focus:text-blue-600" type="text"
            placeholder="Search Customer..." />
          <img class="h-12 w-12 cursor-pointer" src="../assets/search.png" alt="搜索">
        </div>
      </div>
    </div>
    <div class="w-3/4 flex ph:w-full justify-center mt-3">
      <div class="w-9/12 ph:w-full">
        <CustomTabs :list="list" ref="tabRef" class="mb-3"></CustomTabs>
        <div class="w-full">
          <ListItem>
          </ListItem>
          <!-- <div class="h-[100px] w-full mb-2" v-for="item in data">
            {{ item }}
          </div> -->
        </div>
      </div>
      <div class=" w-3/12 ph:hidden">side
      </div>
    </div>
    <div class="w-full" ref="target">footer</div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
// import VirtualList from 'vue-virtual-scroll-list'
import ListItem from '../components/ListItem/ListItem.vue';
import CustomTabs from '../components/CustomTabs.vue';
import { breakpointsTailwind, useBreakpoints, useElementVisibility, useScroll } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)
const isPc = breakpoints.greater('md')
const target = ref()
const tabRef = ref()
const targetIsVisible = useElementVisibility(target)
const tabIsVisible = useElementVisibility(tabRef)
const data = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
watch(targetIsVisible, (value) => {
  if (value) {
    setTimeout(() => {
      data.value.push(1)
    }, 1000)
  }
})
watch(tabIsVisible, (value) => {
  // console.log(value);
})

// const bottomEL = ref(null)
// const bottom = useElementVisibility(bottomEL)
// watch(bottom, (value) => {
// })
const { x, y, isScrolling, arrivedState, directions } = useScroll(tabRef)
// watch(isScrolling,(state)=> {
//   console.log('111',state);
// })
// useInfiniteScroll(
//   el,
//   () => {
//     // load more
//     data.value.push(...[1])
//   },
//   { distance: 10 }
// )

const list = ref([
  { id: '1', name: '首页' },
  { id: '2', name: '乡村振兴' },
  { id: '3', name: '广州' },
  { id: '4', name: '重点' },
  { id: '5', name: 'test1' },
  { id: '6', name: 'test2' },
])
</script>