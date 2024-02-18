import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth';

import cookies from 'js-cookie';
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/flighhome'
    },
    {
      path: '/flighhome',
      name: 'HomeView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/ticketlist',
      name: 'ticketlist',
      component: () => import('../views/TicketPriceListView.vue')
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginPage.vue')
    },
    {
      path: '/membercenter',
      name: 'membercenter',
      component: () => import('../views/MemberCenterView.vue'),
      meta: { requiresAuth: true }
    }

  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  console.log(cookies.get('isLogin'))
  if(cookies.get('isLogin')) {
    console.log(cookies.get('isLogin'))
    authStore.setLoginStatus(true);
    console.log(authStore.isLogin);
    cookies.remove('isLogin');
  }

  if(to.meta.requiresAuth && !authStore.isLogin){
    next({name: 'HomeView'})
  }else {
    next();
  }
})


export default router
