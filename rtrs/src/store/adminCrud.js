import axios from "axios";

const state={
    mybookings:[]
};
const getters={
    // getMyBooking: (state) => state.mybookings
}
const mutations={
    setMyBooking(state, payload) {
        state.mybookings=payload;
      },
};
const actions={
    editAction({ commit }, payload) {
        return new Promise((resolve, reject) => {
          axios.post("https://612fc48a5fc50700175f1748.mockapi.io/bookings", payload).then(
            (response) => {
              resolve(response);
            }).catch(
            (error) => {
                alert(error)
              reject(error);
            })
        });
      },
      getBookingAction({ commit }) {
        return new Promise((resolve, reject) => {
          axios.get("https://612fc48a5fc50700175f1748.mockapi.io/bookings").then(
            (response) => {
                commit("setMyBooking", response.data);
              resolve(response);
            }).catch(
            (error) => {
              reject(error);
            })
        });
      },
        deleteAction({ commit }, payload) {
          return new Promise((resolve, reject) => {
            axios.post("https://612fc48a5fc50700175f1748.mockapi.io/bookings", payload).then(
              (response) => {
                alert("Ticket cancelled successfully !!")
                resolve(response);
              }).catch(
              (error) => {
                  alert(error)
                reject(error);
              })
          });
        },
        newAction({ commit }, payload) {
            return new Promise((resolve, reject) => {
              axios.post("https://612fc48a5fc50700175f1748.mockapi.io/bookings", payload).then(
                (response) => {
                  resolve(response);
                }).catch(
                (error) => {
                    alert(error)
                  reject(error);
                })
            });
          },
};
   
export default{
    state,
    mutations,
    actions,
    getters
}