import { defineStore } from 'pinia';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useAppStore = defineStore('storeId', {
  state: () => {
    return {
      AppToolbarItems: null,
    };
  },
  // getters: {
  //   fullName: state => `${state.firstName} ${state.lastName}`,
  // },
  // actions: {
  //   increment() {
  //     this.counter++;
  //   },
  // },
});

export default useAppStore;