<template>
	<div>

         <div class="container h-90-vh">
          <div class="row h-100 justify-content-center align-items-center">
           <div class="col-md-12 text-center">
            <!-- <b-button block variant="danger" ></b-button> -->
            <div id="google-signin-button"></div>
           </div>
          </div>
         </div>

    </div>
</template>

<script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>

<script>
    
    function init() {
      gapi.load('auth2', function() {
        /* Ready. Make a call to gapi.auth2.init or some other API */
        console.log("login G")
      });
    }


</script>

<script>
	
	export default {
    	methods : {
            async login(){
                const user = await gapi.auth2.init()
                this.onSignIn(user)

            },
            onSignIn(googleUser) {
                const profile = googleUser.getBasicProfile()
                const googleIDToken = googleUser.getAuthResponse().id_token
                const googleUserInfo = {name : profile.getGivenName(), email : profile.getEmail()}
                this.$store.dispatch('user/googleSignIn', {googleIDToken, googleUserInfo})
            },
    	},
        mounted() {
            setTimeout(() => {
                gapi.signin2.render('google-signin-button', {
                    onsuccess: this.onSignIn, 
                },10000)
            })
        },
	}

</script>

<style>

    .h-90-vh {
        height : 90vh
    }

</style>