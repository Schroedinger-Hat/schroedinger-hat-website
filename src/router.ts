import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/video',
    name: 'RedirectVideo',
    component: () => import('@/views/RedirectVideo.vue'),
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
    component: () => import('@/views/Team.vue'),
  },
  {
    path: '/team/:member',
    name: 'TeamMember',
    component: () => import('@/views/TeamMember.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
