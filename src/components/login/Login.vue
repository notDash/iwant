<template>
  <div>
    <nav-header :title="name" class="s_header"></nav-header>
    <div id="sign-in">
      <div class="sign-form">
        <group>
          <cell value-align="left">手机号</cell>
        </group>
        <group class="form-input">
          <x-input :show-clear="true" :max="13" mask="99999999999" is-type="china-mobile" v-model="maskValue">
            <label slot="label" style="font-size: 14px;padding-right:5px;color:#999999;">+86</label>
          </x-input>
        </group>
        <group>
          <cell value-align="left">密码</cell>
        </group>
        <group class="form-input">
          <x-input type="password" :show-clear="true" v-model="Password" placeholder="请输入6-12位密码"></x-input>
        </group>
        <group>
          <cell>
            <router-link to="/regist/找回密码" style="color: #999999;font-size: 12px;">忘记密码</router-link>
          </cell>
        </group>
        <group class="form-btn">
          <x-button @click.native="logIn">完成</x-button>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
import { XInput, XButton, Group, Cell } from 'vux';
import NavHeader from '@/components/NavHeader/NavHeader';
import { login } from '../../utils/api'
import qs from 'qs'

export default {
  data() {
    return {
      name: '登录',
      maskValue: '',
      Password: ''
    }
  },
  components: {
    NavHeader,
    XInput,
    XButton,
    Group,
    Cell
  },
  mounted() {
    // Common.getDeviceCode()
  },
  methods: {
    logIn() {
      let obj = {
        username: this.maskValue,
        password: this.Password,
        phonecode: '100d8559091531c6f04'
      }
      login(obj).then(res => {
        if (res.code === 10000) {
          window.sessionStorage.setItem('log', res.msg.code)
          this.$router.push('/home')
        } else {
          this.$vux.toast.show({
            text: 'Loading'
          })
        }
      })
    }
  },
  created() {
    //		console.log(window.abcd)
  }
}
</script>

<style lang="less">
@import './Login.less';
</style>
