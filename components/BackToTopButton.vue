<template>
	
	<b-button variant="secondary" @click="backToTop" class="back-to-top pointer" v-show="showButton">
	  <b-icon-arrow-up 
	    variant="light"  
	    aria-hidden="true"
	  />
	</b-button>

</template>

<script>

	export default {
		data(){
			return {
				showButton : false
			}
		},
	  	methods : {
	  		backToTop(){
	  			window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
			},
			isVisible(){
		  		const windowHeight = window.innerHeight 
		  		const scroll = window.scrollY //.pageYOffset || document.documentElement.scrollTop 
		  		this.showButton = 1.5 * windowHeight < scroll
		  	}
		}, 
		beforeMount () {
		    window.addEventListener('scroll', this.isVisible);
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.isVisible);
		}
	}

</script>

<style>
	
	.pointer {
	  cursor: pointer;
	}

	.back-to-top {
	  position: fixed;
	  bottom: 10px;
	  left: 10px;
	  z-index: 1000;
	  opacity: 0.7;
	  background-color: #343a40 !important;
	  border: 0px;
	}

	.back-to-top:hover {
	  opacity: 1;
	}

</style>
