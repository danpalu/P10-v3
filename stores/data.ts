export const useDataStore = defineStore("data", {
  state: () => {
    return { count: 0 };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    openChat(question: Question) {},
  },
});
