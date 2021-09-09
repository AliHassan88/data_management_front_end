import axios from "axios";
import router from "@/router";

const state={};
const getters={}
const mutations={};
const actions={
    registerAction({ commit }, payload) {
        return new Promise((resolve, reject) => {
          axios.post("http://localhost:8080/register", payload, {
            headers: {
              
            }
          }).then(
            (response) => {
              
              // console.log(response.data);
            //   localStorage.setItem("token", response.data.token);
            alert(response)
        router.push("/")
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