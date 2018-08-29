import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
// import Login from '@/components/Login';
import Login from '@/components/login/Login';
import Register from '@/components/Register/Register';
import Action from '@/components/Action/Action';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/action',
      name: 'Action',
      component: Action,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
});
