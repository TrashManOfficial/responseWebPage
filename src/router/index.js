import { createRouter, createWebHistory } from "vue-router"

import store from "../store"

const AuthLayout = () => import('../layouts/AuthLayout.vue')
const Login = () => import('../views/auth/Login.vue')
const Register = () => import('../views/auth/Register.vue')
const BlankLayout = () => import('../layouts/BlankLayout.vue')

const AppLayout = () => import('../layouts/AppLayout.vue')
const User = () => import('../views/user/User.vue')
const DetailUser = () => import('../views/user/DetailUser.vue')

const NotFound = () => import('../views/NotFound.vue')

const Home = () => import('../views/Home.vue')
const Detail = () => import('../views/Detail.vue')



const routes = [
  {
    path: '/test',
    name: 'test',
    // component: Test
  },
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
      // {
      //   path: '/register',
      //   name: 'register',
      //   component: Register
      // },
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/users',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/users',
        name: 'users',
        component: User
      },
      {
        path: '/users/:id',
        name: 'users-detail',
        component: DetailUser
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.auth_user.token) {
    next({ name: 'login' })
  } else if (to.meta.isGuest && store.state.auth_user.token) {
    next({ name: 'users' })
  } else {
    next()
  }
})

export default router