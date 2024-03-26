<script setup lang="ts">
const showLoading = ref<boolean>(false)
uni.$on('showLoadingPage', () => {
  console.log('show page')
  showLoading.value = true
})
uni.$on('hideLoadingPage', () => {
  console.log('close page')
  showLoading.value = false
})

</script>

<template>
  <view class="fixed z-10">
    <u-loading-page :loading="showLoading" bg-color="#e8e8e8"></u-loading-page>
  </view>
</template>

<style scoped>

</style>
