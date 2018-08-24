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
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      welcome: 'Welcome to the world of Vue',
    };
  },
};
</script>
