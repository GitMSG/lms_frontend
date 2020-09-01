import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import EditUserRoles from './views/EditUserRoles.vue'
import ProfileForm from './views/ProfileForm.vue'
import Profile from './views/Profile.vue'
import AdmnProfile from './views/AdmnProfile.vue'
import AllProfiles from './views/AllProfiles.vue'
import UnApprovedList from './views/UnApprovedList.vue'
import Settings from './views/Settings.vue'
import Search from './views/Search.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admnprofile',
      name: 'admnprofile',
      component: AdmnProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/unapprovedlist',
      name: 'unApprovedList',
      component: UnApprovedList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/allProfiles',
      name: 'allProfiles',
      component: AllProfiles,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profileForm",
      name: "profileForm",
      component: ProfileForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
     {
       path: "/editUserRoles",
       name: "editUserRoles",
       component: EditUserRoles,
       meta: {
         requiresAuth: true
       }
     },
     {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const user = auth.getUser();

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && !user) {
    next("/");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
