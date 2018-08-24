<template>
<div>
  <nav-header :title="name" class="s_header"></nav-header>
  <div id="regist">
    <div class="regist-form">
      <p class="regist-phone">手机号</p>
      <x-input :show-clear="true" v-model="maskValue" :max="11" mask="99999999999" is-type="china-mobile">
        <label slot="label" style="font-size: 14px;padding-right:5px;">+86</label>
      </x-input>
      <group class="regist-item">
        <x-button @click.native="regist" style="background: #9579FF;color: #FFF;">下一步</x-button>
      </group>
    </div>
  </div>
</div>
</template>

<script>
import { XInput, XButton, Group } from 'vux';
import NavHeader from '@/components/NavHeader/NavHeader';
import { regist } from '../../utils/api';
import { AlertModule } from 'vux';

export default {
  data() {
    return {
      name: '注册',
      maskValue: ''
    }
  },
  components: {
    NavHeader,
    XInput,
    XButton,
    Group
  },
  mounted() {
    // this.name = this.$route.params.type
  },
  methods: {
    regist() {
      regist({
        phonenumber: this.maskValue
      }).then(res => {
        if (res.code === 10000) {
          console.log(res)
          window.sessionStorage.setItem('phone', this.maskValue)
          this.$router.push({
            path: '/registCode/' + this.name,
            query: {
              phone: this.maskValue
            }
          })
        } else {
          console.log(res.msg)
          AlertModule.show({
            title: res.msg,
            onShow() {
              console.log("Module: I'm showing")
            },
            onHide() {
              console.log("Module: I'm hiding now")
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
@import './Register.less';
</style>
