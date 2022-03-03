import { defineStore } from "pinia";

const numberStore = defineStore({
  id: "numberId",
  state: () => {
    return {
      counter: 0,
      data: [],
    };
  },
  getters: {},
  actions: {
    increment() {
      this.counter++;
    },
    decrement() {
      if (this.counter === 0) {
        return (this.counter = 0);
      }
      this.counter--;
    },
    addData(dataInput) {
      //   const result = [...this.data, dataInput];
      //   this.data = result;
      this.data.push(dataInput);
    },
    // clearData() {
    //   //   const result = [...this.data, dataInput];
    //   //   this.data = result;
    //   this.data = [];
    // },
  },
});

export default numberStore;
