const storeRef = "/video/";

export const namespaced = true;

export const state = () => ({
  	homePageItems : [],
    items : [],
  	item : {}, 
    length : 0, 
});

export const mutations = {
  	ADD(state, item){
  		state.items.push(item)
  	},
  	SET_MANY(state, items){
      state.items = items
  	},
    SET_HOMEPAGE(state, items){
      state.homePageItems = items
    },
    ADD_MANY(state, items){
      state.items = state.items.concat(items)
    }, 
    SET_LENGTH(state, value){
      state.length = value
    }, 
  	SET_ONE(state, item){
  		state.item = item
  	},
    DEL_ONE(state, id){
      state.items = state.items.filter(el => {return el._id !== id})
    }, 
    DEL_MANY(state, items){
      state.items = []
    }
};

export const actions = {
   
    async fetchOne ({ commit, dispatch }, id){
      try {
        let response = await this.$axios.$get(storeRef + id)
        return response.results
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    },

    async filter ({ commit, dispatch }, filter = {}){
      try {
        let response = await this.$axios.$post(storeRef+"filter", filter)
        if(filter.skip ===0) {
          commit('SET_MANY', response.results)
        } else {
          commit('ADD_MANY', response.results);
        }
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

    async fetchLink ({ commit, dispatch }, id){
      try {
        let response = await this.$axios.$get(storeRef + "out/" + id)
        return response.results
        } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, 

    async fetchHomePage ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef + "home")
        commit('SET_HOMEPAGE', response.results);
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, 

    async search ({ commit, dispatch }, data){ // data = {search, limit : "LIMIT_1"}  or {search}
      try {
        if(data.limit){
          console.log("limit === true")
          let response = await this.$axios.$post(storeRef + "search", data)
          commit('SET_MANY', response.results)
        } else {          
          let response = await this.$axios.$post(storeRef + "search", data )
          return response.results
        }
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    },

    async stats ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef + "stats")
        return response.stats;
      } catch(error) {
        // notification.ReponseError(dispatch, error.message)
        throw error
      }
    }, 

    async broken ({ commit, dispatch }){
      try {
        let response = await this.$axios.$delete(storeRef + "broken-links")
        return response.results;
      } catch(error) {
         return error.message
        throw error
      }
    },  

    async scrapNew ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef + "scrap/new")
        return response.results;
      } catch(error) {
         return error.message
        throw error
      }
    },  

    async adfly ({ commit, dispatch }){
      try {
        let response = await this.$axios.$get(storeRef + "adfly")
        return response.results;
      } catch(error) {
         return error.message
        throw error
      }
    },  

    async schedule ({ commit, dispatch }){
      try {
        await this.$axios.$get('/schedule/start')
      } catch(error) {
         return error.message
        throw error
      }
    }, 

    eraseAll({commit}, boolean_){
      if(boolean_) commit('DEL_MANY')
    }, 
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