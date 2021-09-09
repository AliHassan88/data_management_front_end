import axios from "axios";
import router from "@/router";

const state={};
const getters={}
const mutations={};
const actions={
    loginAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:8080/login", payload, {
        headers: {
        }
      }).then(
        (response) => {
        alert(response)
        // router.push("/Dashboard")
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