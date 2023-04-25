const storeRef = "/log/";

export const namespaced = true;

export const state = () => ({
 
});

export const mutations = {

};

export const actions = {
   
    async fetchOne ({ commit, dispatch }, name){
      try {
        let response = await this.$axios.$get(storeRef + name)
        return response.results;
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    },
    async fetchMany ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef)
        return response.results
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, 
};

export const getters = {

};