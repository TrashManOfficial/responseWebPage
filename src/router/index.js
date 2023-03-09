import { createRouter,createWebHashHistory } from "vue-router"

const BlankLayout = () => import('../layouts/BlankLayout.vue')
const NotFound = () => import('../views/NotFound.vue')
const Home = () => import('../views/Home.vue')
const Detail = () => import('../views/Detail.vue')
const Special = () => import('../views/Special.vue')
const About = () => import('../views/About.vue')



const routes = [
  {
    path: '/',
    redirect: '/home',
    component: BlankLayout,
    meta: { isGuest: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/special',
    name: 'special',
    component: Special
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   next()
// })

export default router