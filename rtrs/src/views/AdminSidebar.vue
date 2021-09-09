<template>
  <v-card>
    <v-navigation-drawer
      style="background-color:lightgrey;position:relative;"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2 float-right">
        <v-btn class="float-right" icon @click.stop="mini = !mini">
          <v-icon v-if="mini == true">mdi-menu</v-icon>
          <v-icon size="30" v-if="mini == false">mdi-menu-open</v-icon>
        </v-btn>
      </v-list-item>
      <br /><br />
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
          color="black"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item style="position:absolute;bottom:0;">
        <v-btn
          color="balck"
          class="black--text mb-1"
          :class="mini == false ? 'ml-7' : 'ml-n2'"
          icon
          @click.stop="logout()"
        >
          <v-icon>mdi-logout</v-icon>
          <span
            v-if="mini == false"
            style="font-weight:bold"
            class="text-capitalize"
            ><h3 class="ml-1">Log out</h3></span
          ></v-btn
        ></v-list-item
      >
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Admin Dashboard",
          icon: "mdi-calendar-month",
          path: "/AdminDashboard",
        },
      ],
      mini: true,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
