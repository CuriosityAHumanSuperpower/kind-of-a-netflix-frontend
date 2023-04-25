const storeRef = "/category/";

export const namespaced = true;

export const state = () => ({
  	items : [],
  	item : {}, 
    topItems : [], 
    alphabet : [], 
    length : 0, 
    names : []
});

export const mutations = {
  	ADD(state, item){
  		state.items.push(item)
  	},
  	SET_MANY(state, items){
      state.items = items
  	}, 
    SET_LENGTH(state, value){
      state.length = value
    }, 
    SET_NAMES(state, items){
      state.names = items
    }, 
    SET_RANDOM_TOP(state, items){
      state.topItems = items
    }, 
  	SET_ONE(state, item){
  		state.item = item
  	},
    DEL_ONE(state, id){
      state.items = state.items.filter(el => {return el._id !== id})
    }
};

export const actions = {
   
    async fetchOne ({ commit, dispatch }, id){
      try {
        let response = await this.$axios.$get(storeRef + id)
        commit('SET_ONE', response.results);
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    },
    async fetchMany ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef+"by-first-letter")
        commit('SET_MANY', response.results);
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, 
    async fetchRandomTop ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef + "random-top")
        commit('SET_RANDOM_TOP', response.results);
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, 
    async fetchTotalNb ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef + "total")
        commit('SET_LENGTH', response.results[0].total);
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, 
    async search ({ commit, dispatch }, value){
      try {
        let response = await this.$axios.$post(storeRef + "search", {search : value})
        return response.results
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, 
    async update ({ commit, dispatch }){
      try {
        let response = await this.$axios.$put(storeRef + "update-list")
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    },
/*    async fetchNames ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef + "names")
        commit('SET_NAMES', response.results);
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, */

};

export const getters = {
  	getItemById: state => id => {
  		return state.items.find(el => el._id === id)  
  	}, 
    getItemsName : state => {
      return state.items.map(el => el.name).sort()
    }, 
    getItemIdByName : state => name => {
      return state.items.find(el => el.name === name)._id 
    }, 
    getAlphabet : state => {
      return state.items.map(element => {return element._id})
    }
};