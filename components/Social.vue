<template>
	
	<ShareNetwork
	    :network="network"
	    :url="url"
	    title="XIS"
	    description="Look what I found ! Pretty sure you're gonna love it ;)"
	    quote="Find any video you want !"
	    hashtags="Xis"
	  >
	     <p :class="pClass"><slot></slot></p>
	</ShareNetwork>

</template>

<script>
	
	export default {
		props : {
			url : { type : String, default : "xis.com"}, 
			network : {type : String, default : "facebook"},
			pClass : { type : String, default : 'h7 mb-2'},
		}
	}

</script>