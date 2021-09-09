<template>
  <div style="background-color:lightgrey; width:100%">
    <v-data-table
      :headers="headers"
      :items="getSchedule"
      class="elevation-1 ma-5"
      height="75vh"
      style="background-color:rgba(180,180,180,0.5)"
    >
      <template v-slot:top>
        <v-toolbar flat style="background-color:grey">
          <v-toolbar-title style="font-weight:500"
            >Railway Schedule</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card style="background-color:rgba(180,180,180)">
              <v-card-title>
                <p style="font-weight:bold">Confirm Your Booking Details</p>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.From"
                        label="From"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.To"
                        label="To"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Time"
                        label="Time"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Date"
                        label="Date"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Price"
                        label="Price"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mt-n1 ml-n3" text @click="close">
                  Cancel
                </v-btn>
                <v-btn class="mt-n2" dark @click="save">
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="editItem(item)" color="grey" class="mr-n5">Select</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    uuid: "",
    headers: [
      {
        text: "From",
        align: "start",
        sortable: false,
        value: "From",
      },
      { text: "To", value: "To" },
      { text: "Time", value: "Time" },
      { text: "Date", value: "Date" },
      { text: "Price", value: "Price" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      From: "",
      To: "",
      Time: "",
      Date: "",
      Price: "",
    },
  }),

  computed: {
    ...mapGetters(["getSchedule"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    console.log("This is the value of router", this.$router)
    this.runScheduleAction();
  },

  methods: {
    ...mapActions(["scheduleAction", "bookAction"]),

    runScheduleAction() {
      this.scheduleAction();
    },

    editItem(item) {
      this.editedIndex = this.getSchedule.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },

    save() {
      if (this.editedIndex > -1) {
        this.bookAction({
          from: this.editedItem.From,
          to: this.editedItem.To,
          date: this.editedItem.Date,
          time: this.editedItem.Time,
          price: this.editedItem.Price,
        }).then(
          this.close(),
          alert("Congratulations !! You have successfully booked your ticket.")
        );
      }
    },

  },
};
</script>
<style></style>
