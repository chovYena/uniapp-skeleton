# uniapp-skeleton

一个`uniapp`的`vue3`基础开发模板

## 内置

-  uniapp
-  pinia
-  [pinia-auto-refs](https://github.com/Allen-1998/pinia-auto-refs) ( pinia自动ref,无需storeToRefs)
-  [pinia-plugin-persist-uni](https://allen-1998.github.io/pinia-plugin-persist-uni/) ( 持久化)
-  [vue-native-websocket-vue3](https://github.com/likaia/vue-native-websocket-vue3) ( ws 客户端)
-  [uview-plus](https://github.com/ijry/uview-plus)(UI)
-  [z-paging](https://github.com/SmileZXLee/uni-z-paging) ( 页面加载)
-  [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)( ref,computed 等自动引入)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)( 组件自动引入)
- [unocss](https://github.com/unocss/unocss)( css )
- weixin-js-sdk(公众号开发使用)

## 代码效验

 `eslint`与`prettier`  使用 `antfu`合并 `eslintConfigPrettier`

## 全局加载页

使用`vite`插件模式追加 ,`uni.$emit` 控制显示和隐藏

## 目录结构
```js

├── src
│   ├── @types ts类型定义
│   ├── api 请求中心
│   ├── components 项目组件
│   ├── @helper storeToRefs 增强(pinia-auto-refs自动生成)
│   ├── hooks hooks函数
│   ├── layout 整体布局
│   ├── pages 页面目录
│   ├── static 静态资源、css
│   ├── store 状态管理
│   └── utils 工具包
│   ├── App.vue 入口文件
│   ├── auto-imports.d.ts 自动导入vue-composition-api(unplugin-auto-import自动生成)
│   ├── components.d.ts 自动导入组件(unplugin-vue-components自动生成)
│   ├── env.d.ts 全局声明
│   ├── main.ts 主入口
│   ├── wechat.ts 微信js-sdk
│   ├── webscoket.ts pinia实现的ws客户端
│   ├── manifest.json 应用配置文件
│   ├── pages.json 全局配置文件
│   └── uni.scss uni-app内置的常用样式变量
└── vite-plugin-insert-loading.ts 全局loading
└── vite.config.ts vite配置
```

