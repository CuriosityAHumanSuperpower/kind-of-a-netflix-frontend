<template>
	<div >

		<b-navbar toggleable="md" type="dark" variant="dark" class="top-absolute"> <!-- fixed="top" -->

		    <b-navbar-brand to="/">
		    	<img src="~assets/logo/logo.png" class="logo" alt="netflix">
		    </b-navbar-brand>

		    <b-navbar-toggle target="navbar-toggle-collapse">
		      <template #default="{ expanded }">
		        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
		        <b-icon v-else icon="chevron-bar-down"></b-icon>
		      </template>
		    </b-navbar-toggle>

		    <b-collapse id="navbar-toggle-collapse" is-nav>
		      <b-navbar-nav class="mr-auto">
		        <b-nav-item to="/search/new">New</b-nav-item>
		        <b-nav-item to="/search/popular">Popular</b-nav-item>
		        <b-nav-item to="/categories">Categories</b-nav-item>
		        <b-nav-item to="/actors">Actors</b-nav-item>
		        <b-nav-item v-b-toggle.search href="#top" v-if="showSearch"><b-icon-search/> Seach</b-nav-item>
		        <b-nav-item to="/admin" v-if="$auth.loggedIn && roles.includes($auth.user.role)">Admin</b-nav-item>
		      </b-navbar-nav>

	<!-- 	      <b-navbar-nav class="ml-auto" >
				<b-input-group size="sm" >
					<b-form-input placeholder="Search" ></b-form-input>

					<b-input-group-append>
						<b-button variant="light"><b-icon-search/></b-button>
					</b-input-group-append>

				</b-input-group>
		      </b-navbar-nav>   -->    

		      <b-avatar v-if="$auth.loggedIn" variant="light"> {{$auth.user.name[0]}} </b-avatar>

		    </b-collapse>
		</b-navbar>



		<SearchBar/>

	</div>
</template>

<script>
	export default {
		props : {
			showSearch : {type : Boolean, default : true}
		}, 
		data(){
			return {
				roles : ['moderator', 'admin']
			}
		}
	}

</script>

<style >
	
	.logo {
		width: 35px;
	}

	.expand div:hover{
		width : 100%
	}

/*	#search {
		width:1%;
		transition:width .5s ease
	}

	#search:focus{
		width:200%
	}*/

	#search {
		background-color : #40464b;
	}

	.top-absolute {
		position: absolute !important;
	    top: 0;
	    right: 0;
	    left: 0;
	    z-index: 1030;
	}

</style>