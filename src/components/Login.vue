<template>
  <div class="login">
    <div class="login-item">
      <label for="userName">User Name</label>
      <input type="text" v-model="userName" id="userName" placeholder="Input user name">
    </div>
    <div class="login-item">
      <label for="passw">Password</label>
      <input type="password" v-model="passw" id="passw" placeholder="Input password">
    </div>
    <div class="login-item">
      <!-- <button v-on:click="login" class="btn">Login</button> -->
      <button v-on:click="actionLogin" class="btn">Login</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import router from '../router';
import { login as userLogin } from '../utils/api';

export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      passw: '',
    };
  },
  methods: {
    ...mapMutations([
      'setUserName',
    ]),
    ...mapActions([
      'login',
    ]),
    actionLogin: function actionLogin() {
      this.login().then(() => {
        router.push('/helloworld', () => {
          /* eslint-disable no-console */
          console.log('Success...');
        }, () => {
          /* eslint-disable no-console */
          console.log('Failed...');
        });
      });
    },
    mutationsLogin: function login() {
      userLogin({}).then((res) => {
        /* eslint-disable no-console */
        console.log(`Login success: ${JSON.stringify(res)}`);
        // commit a mutation
        // this.$store.commit('setUserName', res); // 设置userName
        /* this.$store.commit({
          type: 'setUserName',
          userName: res.userName,
        }); */
        this.setUserName(res);
        router.push('/helloworld', () => {
          /* eslint-disable no-console */
          console.log('Success...');
        }, () => {
          /* eslint-disable no-console */
          console.log('Failed...');
        });
      }).catch((err) => {
        /* eslint-disable no-console */
        console.log(`Login error: ${err}`);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-item {
    margin-bottom: 30px;
  }
  .btn {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
  }
</style>
