<template>
  <div>
    <q-layout view="lHh Lpr lff">
      <q-header elevated classx="bg-cyan-8">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="drawer = !drawer"
          />
          <q-toolbar-title> AMG App Template </q-toolbar-title>

          <AppToolbarSlot />

          <q-btn flat round dense icon="account_circle">
            <q-menu>
              <q-list style="min-width: 230px">
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Your Name</q-item-label>
                    <q-item-label caption>account@amg.co.id</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="400">
        <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
          <q-list>
            <LeftMenuItem
              v-for="(menu, index) in menus"
              :key="index"
              v-bind="menu"
            />
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import AppToolbarSlot from "templates/AppToolbarSlot";
import menuItems from "config/menus";
import LeftMenuItem from "components/LeftMenuItem.vue";

export default {
  name: "MainLayout",

  components: {
    AppToolbarSlot,
    LeftMenuItem,
  },

  setup() {
    const drawer = ref(false);
    const menus = ref(menuItems);

    // Find default route
    const activeItem = menuItems.find((item) => item.active);

    if (activeItem && location.hash === "#/") {
      location.hash = activeItem.link;
    }

    return {
      drawer,
      menus,
    };
  },
};
</script>
