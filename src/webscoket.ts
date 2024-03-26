import type { App } from 'vue';
import VueNativeSock from 'vue-native-websocket-vue3';

interface SocketStore {
  // 连接状态
  isConnected: boolean
  // 消息内容
  message: string
  // 重新连接错误
  reconnectError: boolean
  // 心跳消息发送时间
  heartBeatInterval: number
  // 心跳定时器
  heartBeatTimer: number
}
export function useSocketStore(app?: App<Element>) {
  return defineStore({
    id: 'socket',
    state: (): SocketStore => ({
      // 连接状态
      isConnected: false,
      // 消息内容
      message: '',
      // 重新连接错误
      reconnectError: false,
      // 心跳消息发送时间
      heartBeatInterval: 50000,
      // 心跳定时器
      heartBeatTimer: 0,
    }),
    actions: {
      // 连接打开
      SOCKET_ONOPEN(event: any) {
        console.log('successful websocket connection');
        uni.hideLoading();
        app && (app.config.globalProperties.$socket = event.currentTarget);
        this.isConnected = true;
        // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
        this.heartBeatTimer = window.setInterval(() => {
          const message = '心跳消息';
          this.isConnected
          && app
          && app.config.globalProperties.$socket.sendObj({
            code: 200,
            controller: 'ping',
            msg: message,
          });
        }, this.heartBeatInterval);
      },
      // 连接关闭
      SOCKET_ONCLOSE(event: any) {
        this.isConnected = false;
        // 连接关闭时停掉心跳消息
        window.clearInterval(this.heartBeatTimer);
        this.heartBeatTimer = 0;
        console.log(`连接已断开: ${new Date()}`);
        console.log(event);
      },
      // 发生错误
      SOCKET_ONERROR(event: any) {
        console.error(event);
      },
      // 收到服务端发送的消息
      SOCKET_ONMESSAGE(message: any) {
        this.message = message;
      },
      // 自动重连
      SOCKET_RECONNECT(count: any) {
        // uni.showLoading({
        //   title: '尝试重新连接中',
        // })
        console.info('消息系统重连中...', count);
      },
      // 重连错误
      SOCKET_RECONNECT_ERROR() {
        uni.$u.toast('链接设备失败')
        this.reconnectError = true;
      },
    },
  })();
}

// Need to be used outside the setup
export function useSocketStoreWithOut(app: App<Element>) {
  const wsStore = useSocketStore(app)
  const { token } = useStore('user')
  app.use(
    VueNativeSock,
      `${import.meta.env.VITE_APP_WS_URL}`,
      {
        protocol: token.value,
        // 启用pinia集成 | enable pinia integration
        store: wsStore,
        // 数据发送/接收使用使用json
        format: 'json',
        // 开启手动调用 connect() 连接服务器
        connectManually: true,
        // 开启自动重连
        reconnection: true,
        // 尝试重连的次数
        reconnectionAttempts: 5,
        // 重连间隔时间
        reconnectionDelay: 3000,
      },
  );
}
