<template>
  <div style="background-color:lightgrey; width:100%">
    <v-data-table
      :headers="headers"
      :items="getMyBooking"
      class="elevation-1 ma-5"
      height="75vh"
      style="background-color:rgba(180,180,180,0.5)"
    >
      <template v-slot:top>
        <v-toolbar flat style="background-color:grey">
          <v-toolbar-title style="font-weight:500">My Bookings</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card style="background-color:rgba(180,180,180)">
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark @click="close">Cancel</v-btn>
                <v-btn dark @click="deleteItemConfirm">Yes</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="deleteItem(item)" color="black">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
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
    deletedItem: {
      From: "",
      To: "",
      Time: "",
      Date: "",
      Price: "",
    },
    deletedIndex: -1,
    deleteDialog: false,
  }),
  computed: {
    ...mapGetters(["getMyBooking"]),
  },
  watch: {},
  created() {
    this.runMyBookingAction();
  },
  methods: {
    ...mapActions([
      "deleteMyBookingAction",
      "getBookingAction",
      "deleteMyBookingAction",
    ]),
    runMyBookingAction() {
      this.getBookingAction();
    },
    deleteItem(item) {
      this.deletedIndex = this.getMyBooking.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    close() {
      this.deleteDialog = false;
    },
    deleteItemConfirm() {
    if (this.deletedIndex > -1) {
      this.deleteMyBookingAction({
        From: this.deletedItem.From,
        To: this.deletedItem.To,
        Date: this.deletedItem.Date,
        Time: this.deletedItem.Time,
        Price: this.deletedItem.Price,
      }).then(this.close());
    }
  },
  },
  
};
</script>
<style></style>
