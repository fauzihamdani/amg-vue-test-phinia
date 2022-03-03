const routes = [
  {
    path: "/",
    component: () => import("layouts/Main.vue"),
    children: [
      { path: "", component: () => import("src/pages/Dashboard.vue") },
      { path: "template", component: () => import("src/pages/Page1.vue") },
      {
        path: "device-manager",
        component: () => import("src/pages/DeviceManager.vue"),
      },
      {
        path: "device-registration",
        component: () => import("src/pages/DeviceRegistration.vue"),
      },
      {
        path: "device-settings",
        component: () => import("src/pages/DeviceSettings.vue"),
      },
      { path: "page-3", component: () => import("../pages/Page3.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
