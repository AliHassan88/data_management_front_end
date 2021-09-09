import axios from "axios";
import router from "@/router";

const state={
    schedule:[]
};
const getters={
    getSchedule: (state) => state.schedule,

}
const mutations={
    setSchedule(state, payload) {
        state.schedule=payload;
      },
};
const actions={
    scheduleAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:8080/schedule", payload).then(
        (response) => {
            commit("setSchedule", response.data);
        //   localStorage.setItem("token", response.data.token);
          resolve(response);
        }).catch(
        (error) => {
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