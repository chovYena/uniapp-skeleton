// 引入请求方法
import { get, post, upload } from '@/utils/request'
import type { UploadImageResult } from '@/api/user/types';

// 定义请求地址
enum URL {
  LOGIN = '/login',
  LOGOUT = '/logout',
  UPLOAD = '/upload_file',
  OAUTH = '/oauth_url',
  LOGIN_CODE = '/login_by_code',
  INFO = '/user_info',
  JSCONFIG = '/js_sdk',
}

// 图片上传
export function uploadImage(imagePath: string) {
  return upload<UploadImageResult>({ url: URL.UPLOAD, filePath: imagePath, name: 'file' })
}

// 登录请求
export function login(data: any) {
  return post<any>(URL.LOGIN, data, { loading: true })
}

export function getOAuthUrl(url: string) {
  return get<any>(URL.OAUTH, { url })
}

export function loginByCode(code: string) {
  return get<any>(URL.LOGIN_CODE, { code })
}

export function logout() {
  return get<any>(URL.LOGOUT, {}, { loading: true })
}

export function userInfo() {
  return get<any>(URL.INFO)
}

export function jsSdkConfig(data) {
  return post<any>(URL.JSCONFIG, data)
}
