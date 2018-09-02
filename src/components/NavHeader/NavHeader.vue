<template>
	<div id="nav-header">
		<div class="icon-back">
			<img src="../../../static/img/icon/back.png" v-show="iconBack" @click="bindleClickGoBack" />
		</div>
		<div class="title">{{title}}</div>
		<div class="filter-wrapper">
			<div class="icon-filter" v-show="iconFilter">
				<img src="../../../static/img/icon/filter.png" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    iconFilter: {
      type: Boolean,
      default: false
    },
    iconBack: {
      type: Boolean,
      default: true
    }
	},
	methods: {
		bindleClickGoBack() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="less">
#nav-header {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #e2e2e2;
  background: #efa6a6;
  font-weight: 600;
  .icon-back {
    width: 14px;
    height: 14px;
    display: flex;
  }
  .title {
    font-size: 16px;
    color: #fff;
  }
}
</style>
