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
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="addDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                large
                dark
                class=" text-capitalize"
                v-bind="attrs"
                v-on="on"
                style="margin-left:75%"
                width="120"
              >
                Add New
              </v-btn>
            </template>
            <v-card style="background-color:rgba(180,180,180)">
              <v-card-title>
                <p style="font-weight:bold">Schedule New Train</p>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.From"
                        label="From"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.To"
                        label="To"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.Time"
                        label="Time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.Date"
                        label="Date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newItem.Price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mt-n1 ml-n3" text @click="closeNewDialog">
                  Cancel
                </v-btn>
                <v-btn class="mt-n2" dark @click="addNew">
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.To"
                        label="To"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Time"
                        label="Time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Date"
                        label="Date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.Price"
                        label="Price"
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
          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card style="background-color:rgba(180,180,180)">
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark @click="closeDelete">Cancel</v-btn>
                <v-btn dark @click="deleteItemConfirm">Yes</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="editItem(item)" color="#263238">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)" class="pl-1" color="black"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    addDialog: false,
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
    newItem: {
      From: "",
      To: "",
      Time: "",
      Date: "",
      Price: "",
    },
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
    ...mapGetters(["getSchedule"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.runScheduleAction();
  },

  methods: {
    ...mapActions([
      "scheduleAction",
      "editAction",
      "deleteAction",
      "newAction",
    ]),

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
        this.editAction({
          From: this.editedItem.From,
          To: this.editedItem.To,
          Date: this.editedItem.Date,
          Time: this.editedItem.Time,
          Price: this.editedItem.Price,
          id: this.editedItem.id,
        }).then(this.close(), alert("Schedule edited successfully."));
      }
    },
    deleteItem(item) {
      this.deletedIndex = this.getSchedule.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    closeDelete() {
      this.deleteDialog = false;
    },

    deleteItemConfirm() {
      if (this.deletedIndex > -1) {
        this.deleteAction({
          From: this.deletedItem.From,
          To: this.deletedItem.To,
          Date: this.deletedItem.Date,
          Time: this.deletedItem.Time,
          Price: this.deletedItem.Price,
          id: this.deletedItem.id,
        }).then(this.closeDelete());
      }
    },
    closeNewDialog() {
      this.addDialog = false;
    },
    addNew() {
      this.newAction({
        From: this.newItem.From,
        To: this.newItem.To,
        Date: this.newItem.Date,
        Time: this.newItem.Time,
        Price: this.newItem.Price,
      }).then(
        this.closeNewDialog(),
        alert("New train scheduled successfully !!")
      );
    },
  },
};
</script>
<style></style>
