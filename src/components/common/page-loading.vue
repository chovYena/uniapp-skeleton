<!-- 页面遮盖加载中 -->
<script setup lang="ts">
const showLoading = ref<boolean>(false)

// console.log('loading-page mounted')
uni.$on('showPageLoadingPage', () => {
  // console.log('show page')
  showLoading.value = true
})
uni.$on('hidePageLoadingPage', () => {
  // console.log('close page')
  showLoading.value = false
})

</script>

<template>
  <view v-if="showLoading" class="container">
    <image src="/static/loading.gif" mode="aspectFill" class="loading-image"></image>
    <view class="text">页面加载中...</view>
  </view>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
}

.loading-image {
  width: 100rpx;
  height: 100rpx;
  display: block;
  margin: 0 auto
}

.text {
  font-size: 28rpx;
  text-align: center;
  color: #555;
  width: 100%;
  line-height: 45rpx
}
</style>
