<template>
  <v-app>
    <div
      v-if="$route.path == '/Dashboard' || $route.path == '/MyBookings'"
      class=" d-flex flex"
    >
      <router-view name="Sidebar" />
      <router-view />
    </div>
    <div v-else-if="$route.path == '/AdminDashboard'" class=" d-flex flex">
      <router-view name="AdminSidebar" />
      <router-view />
    </div>
    <div v-else>
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
