<template>
  <div style="background-color:lightgrey; height:102vh">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center ml-16">Welcome to RTRS</h1></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="6" class="mt-10">
        <h1 class="mt-16 mr-10 text-center">Login As Admin</h1>
        <v-text-field
          style="width:530px"
          class="mt-16 ml-10"
          v-model="email"
          label="Email"
          type="email"
          required
          outlined
          dense
          :rules="[rules.required, rules.email]"
        >
        </v-text-field>
        <v-text-field
          class="mt-2 ml-10"
          style="width:530px"
          v-model="password"
          label="Password"
          required
          outlined
          dense
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          hint="At least 8 characters"
          @click:append="show1 = !show1"
        >
        </v-text-field>

        <div class="text-center mt-2 mr-3">
          <v-btn dark width="200" large @click="loginBtn">
            Log in
          </v-btn>
        </div>
        <div class="text-center mt-3">
          <a
            style="color:black"
            class="text-decoration-underline"
            @click="$router.push('/')"
            >Login as Passenger</a
          >
        </div>
      </v-col>
      <v-col cols="6" class="mt-8"
        ><v-img
          style="border-top-left-radius: 30px 50%;
  border-bottom-left-radius: 30px 50%;"
          src="../assets/img1.jpg"
          height="105%"
        >
        </v-img
      ></v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      show1: false,
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    ...mapActions(["adminLoginAction"]),
    loginBtn() {
      this.adminLoginAction({
        email: this.email,
        password: this.password,
      })
        .then()
        .catch();
    },
  },
};
</script>

<style></style>
