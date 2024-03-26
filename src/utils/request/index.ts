// 引入配置
import type { HttpRequestConfig } from 'uview-plus/libs/luch-request/index';
import { requestInterceptors, responseInterceptors } from './interceptors';
import type { IResponse } from './type';
import { hasCached } from '@/utils/request/status';

// 引入拦截器配置
export function setupRequest() {
  uni.$u.http.setConfig((defaultConfig: HttpRequestConfig) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = import.meta.env.VITE_APP_BASE_API;
    if (defaultConfig.header) {
      const { deviceModel, uniPlatform } = uni.getSystemInfoSync()
      defaultConfig.header = {
        ...defaultConfig.header,
        deviceModel,
        uniPlatform,
        version: import.meta.env.VITE_APP_VERSION,
      };
    }
    return defaultConfig;
  });
  requestInterceptors();
  responseInterceptors();
}

export function request<T = any>(config: HttpRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    // 用本地缓存做的简单幂等判断
    if (hasCached(config)) {
      const tips = new Error('请不要重复请求')
      uni.$u.toast(tips.message)
      reject(tips)
      return
    }
    config?.custom?.loading && uni.showLoading({
      mask: true,
      title: '加载中...',
    });

    uni.$u.http.request(config).then((res: IResponse) => {
      const { data } = res;
      resolve(data as T);
    }).finally(() => {
      config?.custom?.loading && uni.hideLoading();
    });
  });
}

export function get<T = any>(url: string, params?: any, custom?: AnyObject): Promise<T> {
  return request({ url, method: 'GET', params, custom });
}

export function post<T = any>(url: string, data: any, custom?: AnyObject): Promise<T> {
  return request({ url, data, method: 'POST', custom });
}

export function upload<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'UPLOAD' });
}

export function download<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'DOWNLOAD' });
}

export default setupRequest;
