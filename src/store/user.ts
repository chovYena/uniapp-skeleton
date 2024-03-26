import { loginByCode, login as loginHandle, logout as logoutHandle } from '@/api/user';

export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
  },
  state: () => {
    return {
      userInfo: {
        token: '',
        user_id: 0,
        openId: '',
      },
    } as {
      userInfo: User.UserInfo
    };
  },
  getters: {
    logged: (state) => {
      const { token, user_id } = state.userInfo;
      return !!(token && user_id);
    },
    token: (state) => {
      return state.userInfo.token;
    },
    userId: (state) => {
      return state.userInfo.user_id;
    },
    openId: (state) => {
      return state.userInfo.openId;
    },
  },
  actions: {
    setUserInfo(userInfo: User.UserInfo) {
      Object.assign(this.userInfo, userInfo);
    },
    loginByCode(code: string) {
      return new Promise((resolve, reject) => {
        loginByCode(code).then((res) => {
          this.setUserInfo(res)
          resolve(res)
        }).catch ((error) => {
          reject(error)
        })
      })
    },
    // 登录
    login(params) {
      return new Promise((resolve, reject) => {
        loginHandle(params).then((res) => {
          this.setUserInfo(res.data)
        }).catch ((error) => {
          reject(error)
        })
      })
    },
    // 通过code登录
    loginWithCode(provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple' | 'univerify' = 'weixin') {
      return new Promise((resolve, reject) => {
        uni.login({
          provider,
          success: (res: UniApp.LoginRes) => {
            loginHandle({ code: res.code }).then((res) => {
              this.setUserInfo(res)
              resolve(res)
            }).catch ((error) => {
              reject(error)
            })
          },
          fail: (error) => {
            reject(error)
          },
        })
      })
    },
    async logout() {
      await logoutHandle()
      this.setUserInfo({
        token: '',
        user_id: 0,
        openId: '',
      })
    },
  },
});
