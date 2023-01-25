import Home from '../views/Home.vue'
import RedirectVideo from '../views/RedirectVideo.vue'
import CodeConduct from '../views/CodeConduct.vue'
import EventList from '../views/EventList.vue'
import Event from '../views/Event.vue'
import Team from '../views/Team.vue'
import TeamMember from '../views/TeamMember.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(''),
  },
  {
    path: '/video',
    name: 'RedirectVideo',
    component: RedirectVideo,
  },
  {
    path: '/code-of-conduct',
    name: 'CodeOfConduct',
    component: CodeConduct,
  },
  {
    path: '/events',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/events/:event',
    name: 'Event',
    component: Event,
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
  {
    path: '/team/:member',
    name: 'TeamMember',
    component: TeamMember,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
