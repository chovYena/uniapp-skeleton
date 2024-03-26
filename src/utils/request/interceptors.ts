import type {
  HttpRequestConfig,
  HttpResponse,
} from 'uview-plus/libs/luch-request/index';
import { showMessage } from './status';
import { getOAuthUrl } from '@/api/user';

// 是否正在刷新token的标记
const isRefreshing: boolean = false;
// 重试队列，每一项将是一个待执行的函数形式
const requestQueue: (() => void)[] = [];

function requestInterceptors() {
  /**
   * 请求拦截
   * @param {object} http
   */
  uni.$u.http.interceptors.request.use(
    (config: HttpRequestConfig) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {};
      const { token } = useStore('user')
      // token设置
      if (token && config.header) {
        config.header.Authorization = `Bearer ${token.value}`;
      }
      if (config.header) {
        config.header.Accept = 'application/json'
      }

      return config;
    },
    (
      config: any, // 可使用async await 做异步操作
    ) => Promise.reject(config),
  );
}

function responseInterceptors() {
  /**
   * 响应拦截
   * @param {object} http
   */
  uni.$u.http.interceptors.response.use(
    async (response: HttpResponse) => {
      /* 对响应成功做点什么 可使用async await 做异步操作 */
      const data = response.data;
      // 配置参数
      const config = response.config;
      // 自定义参数
      const custom = config?.custom;
      // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
      if (custom?.toast !== false) {
        uni.$u.toast(data?.error);
      }

      // 如果需要catch返回，则进行reject
      if (custom?.catch) {
        return Promise.reject(data);
      }
      else {
        // 否则返回一个pending中的promise
        return new Promise(() => {});
      }
      return data || {};
    },
    async (response) => {
      uni.hideToast();
      if (response.statusCode === 401) {
        const { data } = await getOAuthUrl(location.href)

        location.href = data
      }
      if (response.statusCode) {
        // 请求已发出，但是不在2xx的范围
        uni.$u.toast(showMessage(response.statusCode));
        return Promise.reject(response.data);
      }
    },
  );
}

export { requestInterceptors, responseInterceptors };
