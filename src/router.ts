import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/PageHome.vue'),
  },
  {
    path: '/code-of-conduct',
    name: 'CodeOfConduct',
    component: () => import('@/pages/CodeConduct.vue'),
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/pages/PageEvents.vue'),
  },
  {
    path: '/events/:event',
    name: 'EventView',
    component: () => import('@/pages/EventView.vue'),
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/pages/TeamPage.vue'),
  },
  {
    path: '/team/:member',
    name: 'TeamMember',
    component: () => import('@/pages/TeamMember.vue'),
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
