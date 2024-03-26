<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { getOAuthUrl } from '@/api/user';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
onLaunch(async () => {
  console.log('App Launch');

  //logged是true是登录了
  const { logged, loginByCode } = useStore('user')
// console.log(logged)
  const params = new URLSearchParams(location.search);

  console.log('加载完成')
  proxy.$isResolve()
});



onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});

</script>

<style lang="scss">
/* 每个页面公共css */
@import 'uview-plus/index.scss';
</style>
