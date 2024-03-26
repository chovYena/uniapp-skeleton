export default defineStore({
  id: 'locker',
  persist: {
    // 开启持久化
    enabled: true,
  },
  state: () => {
    return {
      id: 0,
      doorId: 0,
    };
  },
  getters: {
  },
  actions: {
    setLockerInfo(id: number, doorId: number) {
      this.id = id
      this.doorId = doorId
    },
  },
});
