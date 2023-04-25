const storeRef = "/user/";

export const namespaced = true;

export const state = () => ({
  	authorized : false
});

export const mutations = {

};

export const actions = {
	//GOOGLE AUTH

	    async googleSignIn({ dispatch }, data) {
	      //SEND DATA
	      try {
	        let response = await this.$axios.$post(storeRef + 'login/google', data)
	        this.$auth.setUser(response.user)
	        this.$auth.setUserToken(response.token, response.token)
	      } catch(error) {
	        // notification.ReponseError(dispatch, error.message)
	        throw error
	      }
	    },

	    // },
	    // googleSignOut() {
	    //     var auth2 = gapi.auth2.getAuthInstance();
	    //     auth2.signOut()
	    // },

	   async refresh ({ commit }){
	     try {
	       let response = await this.$axios.$get(storeRef + "login/refresh")
	       return response.results;
	     } catch(error) {
	        return error.message
	       throw error
	     }
	   }, 
};

export const getters = {

};