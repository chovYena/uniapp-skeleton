import { createSSRApp } from 'vue';
import 'uno.css';
import mpShare from 'uview-plus/libs/mixin/mpShare'
import uviewPlus from 'uview-plus';

import App from './App.vue';

// 引入请求封装
import setupRequest from '@/utils/request';

// 引入pina
import store from '@/store';

// 引入uview-plus

// 引入uview-plus对小程序分享的mixin封装

import { useSocketStoreWithOut } from '@/webscoket';

export function createApp() {
  const app = createSSRApp(App)
    .use(store)
    .use(uviewPlus)
    .mixin(mpShare);
  useSocketStoreWithOut(app)
  // app.vue 页面的同步阻塞方案
  app.config.globalProperties.$onLaunched = new Promise((resolve) => {
    app.config.globalProperties.$isResolve = resolve
  })
  setupRequest()
  return {
    app,
  };
}
