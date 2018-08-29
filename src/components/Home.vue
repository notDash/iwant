<template>
  <div>
    <div>
      <img src="../assets/logo.png">
    </div>
    {{ welcome }}
    <div>
      <router-link to="/Login">Login</router-link>
      <router-link to="/Register">Register</router-link>
    </div>
    <div>
      <x-button @click.native="goAction">
        爱可行
      </x-button>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux';
import router from '../router';

export default {
  name: 'Home',
  data() {
    return {
      welcome: 'Welcome to the world of Vue',
    };
  },
  components: {
    XButton,
  },
  methods: {
    goAction() {
      router.push('/action', () => {
          /* eslint-disable no-console */
          console.log('Success...');
        }, () => {
          /* eslint-disable no-console */
          console.log('Failed...');
        });
    }
  },
};
</script>
