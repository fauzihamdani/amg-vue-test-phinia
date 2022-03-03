<template>
  <AppToolbar :Items="Page1AppToolbarItems" />
  Page 1
  <div class="q-my-xl">{{ useNumberStore.counter }}</div>
  <q-btn
    color="white"
    text-color="black"
    label="Add"
    @click="incrementNumber"
  />

  <q-btn
    color="white"
    text-color="black"
    label="Subtract"
    @click="decrementNumber"
  />
  <div class="q-my-xl">
    <q-input
      filled
      v-model="name"
      label="Your name *"
      hint="Name and surname"
      lazy-rules
    />
    <q-btn color="primary" label="Add Data" @click="addData" />
    <q-btn color="negative" label="clear Data" @click="clearDataShowed" />
  </div>

  <ul data-testid="items">
    <li v-for="item in useNumberStore.data" :key="item.id">
      {{ item.name }}
      <!-- <button @click="cart.removeItem(item.name)" type="button">X</button> -->
    </li>
  </ul>
  <div>
    <pre>{{ JSON.stringify(dataName, 2, 4) }}</pre>
  </div>

  <div>
    <q-form @submit.prevent="showFormContent" autocomplete="off">
      <q-input filled v-model="firstname" label="Your First Name*" />
      <q-file v-model="uploadimage" label="Standard" />
      <q-btn type="submit" color="black" label="Black" />
    </q-form>
  </div>

  <div>
    <!-- <q-btn color="black" label="Black" @click="getFile" /> -->
    <h4>latitude : {{ latitude }}</h4>
    <h4>longitude : {{ longitude }}</h4>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import AppToolbar from "templates/AppToolbar";
import Page1AppToolbarItems from "./Page1AppToolbarItems";
import numberStore from "../stores/number";

export default {
  components: {
    AppToolbar,
  },
  setup(props) {
    const useNumberStore = numberStore();
    const dataName = ref(useNumberStore.data);
    const name = ref(null);
    const uploadimage = ref(null);
    const firstname = ref(null);

    const latitude = ref(null);
    const longitude = ref(null);

    onMounted(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
      });
    });

    const getFile = () => {
      console.log(uploadimage.value);
    };

    const showFormContent = () => {
      const formData = new FormData();

      formData.set("firstname", firstname.value);
      // alert(firstname.value);
      console.log("firstname", firstname.value);
    };

    // const dataInput = ref({

    //   id: 1,
    //   nama: name,
    // });
    const incrementNumber = () => {
      useNumberStore.increment();
    };
    const decrementNumber = () => {
      useNumberStore.decrement();
      useNumberStore.data = [];
    };

    const clearDataShowed = () => {
      // alert("weqw");
      // useNumberStore.clearData();
      // console.log(dataName);

      if (window.confirm("Are you sure you want to clear the cart?")) {
        // cart.rawItems = []
        useNumberStore.data = [];

        alert(useNumberStore.data.length);
      }
    };

    const addData = () => {
      if (!name.value) return;
      const name1 = name.value;

      const data = {
        id: makeid(5),
        name: name1,
      };
      useNumberStore.addData(data);
      name.value = null;
      console.log(name1);
      // alert(useNumberStore.data.length);
    };

    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    return {
      Page1AppToolbarItems,
      useNumberStore,
      incrementNumber,
      decrementNumber,
      dataName,
      // dataInput,
      addData,
      name,
      clearDataShowed,
      uploadimage,
      getFile,
      showFormContent,
      firstname,
      latitude,
      longitude,
    };
  },
};
</script>
