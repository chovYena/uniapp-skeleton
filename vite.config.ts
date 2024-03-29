import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import uniPlugin from '@dcloudio/vite-plugin-uni';
import AutoImportTypes from 'auto-import-types';
import PiniaAutoRefs from 'pinia-auto-refs';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import insertLoading from './vite-plugin-insert-loading';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/h5',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    AutoImportTypes(),
    PiniaAutoRefs(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          '@/helper/pinia-auto-refs': ['useStore'],
        },
      ],
      exclude: ['createApp'],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
    }),
    // 在uni 引入之前
    insertLoading(),
    // uni支持(兼容性写法，当type为module时，必须要这样写)
    (uniPlugin as any).default(),
    Unocss(),
  ],
});
