<template>

	<div> 

		<b-collapse id="search" class="mt-2">
			<b-jumbotron class="container-secondary" :fluid="false">

 			<b-form @submit="onSubmit">
				<b-input-group size="sm" >
					<b-form-input v-model="search" placeholder="Search" required></b-form-input>

					<b-input-group-append>
						<b-button type="reset" v-show="search.length > 0" variant="light" @click="search = ''">X</b-button>
						<b-button variant="light" type="submit"><b-icon-search/></b-button>
					</b-input-group-append>
				</b-input-group>
			</b-form>

					<b-card v-show="!emptyResult && search.length > 0">
				<transition name="extand">
						<b-row align-h="center">
							<b-col cols="12" md="4" v-show="titles.length>0">

								<b-list-group class="black">
									<b-list-group-item >
										<strong>Titles</strong>
									</b-list-group-item>
									<b-list-group-item v-for="item in titles" :key="item" class="pointer" @click="onSubmit">
										{{item}}
									</b-list-group-item>
								</b-list-group>

							</b-col>
							<b-col cols="12" md="4" v-show="actors.length>0">	

								<b-list-group  class="black">
									<b-list-group-item >
										<strong>Actors</strong>
									</b-list-group-item>
									<b-list-group-item v-for="item in actors" class="pointer" :key="item" @click="GoTo(item, 'actor')">
										{{item}} 
									</b-list-group-item>
								</b-list-group>

							</b-col>
							<b-col cols="12" md="4" v-show="categories.length>0">	

								<b-list-group  class="black">
									<b-list-group-item >
										<strong>Categories</strong>
									</b-list-group-item>
									<b-list-group-item v-for="item in categories" class="pointer" :key="item" @click="GoTo(item, 'category')">
										{{item}} 
									</b-list-group-item>
								</b-list-group>

							</b-col>
						</b-row>
				</transition>
					</b-card>
					<b-list-group v-show="emptyResult" class="black">
						<b-list-group-item >No result.</b-list-group-item>
					</b-list-group>

			</b-jumbotron>
		  </b-container>
		</b-collapse>

	</div>
	
</template>

<script>

	export default {

		data(){
			return {
				search : "",
				actors : [], 
				categories : [],
				titles : [], 
			}
		},

		computed : {
			emptyResult(){
				return this.actors.length === 0 && this.categories.length === 0 && this.titles.length === 0&& this.search.length > 0
			}
		},

		methods : {
			GoTo(item, filter){
				if(filter === "actor"){
					this.$router.push({path : `/search/actor/${item}`})
				}
				if(filter === "category"){
					this.$router.push({path : `/search/category/${item}`})
				}
				this.search = ""
				this.$root.$emit('bv::toggle::collapse', 'search')
			}, 
			async onSubmit(event){
				event.preventDefault()
				await this.$store.dispatch("video/search", { search : this.search, limit : "LIMIT_1"})
				this.search = ""
				this.$root.$emit('bv::toggle::collapse', 'search')
			}
		},

		async fetch(){
			if(this.search.length > 0 ){
				this.$router.push({path :"/search"})
				//TITLE
				this.titles = []
				this.titles = await this.$store.dispatch("video/search", { search : this.search})
				//ACTORS
				this.actors = []
				this.actors = await this.$store.dispatch("actor/search", this.search)
				//CATEGORIES
				this.categories = []
				this.categories = await this.$store.dispatch("category/search", this.search)
			} else {
				this.actors = []
				this.categories = []
				this.titles = []
			}			
		}, 

		watch:{
			search : "$fetch"
		}

	}

</script>


<style scoped>

	.extand-enter-active, .extand-leave-active {
	  /*transition: opacity .5s;*/
	  transition: all 1.2s ease;
	  max-height:999px
	}

	.extand-enter, .extand-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  /*opacity: 0;*/
	  max-height: 0px;
	}

	.black {
		color : black;
	}

</style>