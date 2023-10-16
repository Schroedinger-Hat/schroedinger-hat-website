import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/PageHome.vue'),
  },
  {
    path: '/code-of-conduct',
    name: 'CodeOfConduct',
    component: () => import('@/views/CodeConduct.vue'),
  },
  {
    path: '/events',
    name: 'EventList',
    component: () => import('@/views/EventList.vue'),
  },
  {
    path: '/events/:event',
    name: 'EventView',
    component: () => import('@/views/EventView.vue'),
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/views/TeamPage.vue'),
  },
  {
    path: '/team/:member',
    name: 'TeamMember',
    component: () => import('@/views/TeamMember.vue'),
  },
  {
    path: '/sessions',
    name: 'SessionList',
    component: () => import('@/views/SessionList.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
