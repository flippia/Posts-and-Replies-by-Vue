import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Posts from '../views/Posts.vue'
import Create from '../views/Create.vue'
import PostDetails from '../views/PostDetails.vue'

const routes = [{
    path: '/',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
