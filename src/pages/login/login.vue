<script setup lang="ts">
import { forward } from '@/utils/router';

//方法
const { login, openId } = useStore('user')
const form = reactive({
  pass: '',
  name: '',
})

async function formSubmit() {
  let data=await login({
    openId: openId.value,
    ...form,
  })

  // forward('/pages/restocked/index', { replace: true })
}
</script>

<script lang="ts">
export default {
  name: 'WareIndex',
  data() {
    return {
      bgColor: '#fff',

    }
  },
}
</script>

<template>
  <view>
    <view class="warekk">
      <u-navbar
:bg-color="bgColor" title="登录" left-icon-color="#000" title-style="color:#000"
                :placeholder="true"></u-navbar>
    </view>
    <view class="login">
      <!-- 登录 -->
      <view class="login-title">用户登录</view>
      <view class="login-name">
        <up-input
            v-model="form.name"
            prefix-icon="account-fill"
            prefix-icon-style="font-size: 20px;color: #909399"
            placeholder="请输入手机号"
            border="bottom"
            clearable
        ></up-input>
      </view>
      <view class="login-name">
        <up-input

            v-model="form.pass"
            prefix-icon="lock-fill"
            prefix-icon-style="font-size: 20px;color: #909399"
            placeholder="请输入密码"
            border="bottom"
            clearable
            type="password"
        ></up-input>
      </view>
      <view class="login-button">
        <button class="button-subm" @click="formSubmit">立即提交</button>
      </view>
    </view>

  </view>
</template>

<style>
page {
  background: #fff;
}
</style>

<style lang="scss" scoped>
.login {
  margin-top: 30%;
}

.login-title {
  font-size: 38rpx;
  line-height: 80rpx;
  text-align: center;
  font-weight: bold;
  color: #333;
  margin-bottom: 60rpx;
}

.login-name {
  width: 540rpx;
  margin: 20rpx auto;
}

.login-button {
  width: 540rpx;
  margin: 50rpx auto;
}

.button-subm {
  width: 540rpx;
  background: #fd9639;
  color: #fff;
  line-height: 68rpx;
  font-size: 32rpx;
}

::v-deep .u-input__content__field-wrapper__field {
  font-size: 24rpx !important;
}
</style>
