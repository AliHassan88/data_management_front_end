<template>
  <div style="background-color:lightgrey; height:102vh">
    <v-row>
      <v-col cols="11">
        <h1 class="text-center ml-16">Welcome to RTRS</h1></v-col
      >
      <v-col cols="1">
        <v-btn
          width="110"
          link
          to="/"
          class=" float-right ma-2 mt-3"
          dark
          large
        >
          Login</v-btn
        ></v-col
      >
    </v-row>
    <!-- <h1>Book Your Ticket Now !!</h1> -->
    <v-row>
      <v-col cols="6" class="">
        <h1 class="mt-16 mr-10 text-center">Create Account</h1>
        <v-text-field
          style="width:530px"
          class="mt-16 ml-10"
          v-model="name"
          label="Name"
          required
          outlined
          dense
          :rules="[rules.required, rules.name]"
        >
        </v-text-field>
        <v-text-field
          class="mt-2 ml-10"
          style="width:530px"
          v-model="email"
          label="Email"
          outlined
          dense
          :rules="[rules.required, rules.email]"
        >
        </v-text-field>
        <v-text-field
          class="mt-2 ml-10"
          style="width:530px"
          v-model="phone"
          label="Phone"
          required
          outlined
          dense
          :rules="[rules.required, rules.phone]"
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
        <div class="text-center mt-3 mr-3">
          <v-btn dark width="200" large @click="registerBtn">
            Register
          </v-btn>
        </div>
      </v-col>
      <v-col cols="6" class="mt-2"
        ><v-img
          style="border-top-left-radius: 30px 50%;
  border-bottom-left-radius: 30px 50%;"
          src="../assets/img1.jpg"
          height="103%"
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
      name: "",
      email: "",
      phone: "",
      password: "",

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        phone: (value) => {
          const pattern = /^[+\d](?:.*\d)?$/;
          return (
            (pattern.test(value) && value.length >= 8) || "Invalid phone number"
          );
        },
        name: (value) => {
          const pattern = /^[a-zA-Z ]*$/;
          return pattern.test(value) || "Only characters are allowed";
        },
      },
    };
  },
  methods: {
    ...mapActions(["registerAction"]),
    registerBtn() {
      this.registerAction({
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password,
      })
        .then()
        .catch();
    },
  },
};
</script>

<style></style>
