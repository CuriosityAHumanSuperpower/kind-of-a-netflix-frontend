<template> 

	<b-container fluid>

		<h3 class="title"> Search</h3>

		<b-row>
			<b-col cols="12" md="3" xl="2" >

				<h5>Filters</h5>
					
				<Filtering 
					:filter="filter"
					:sort="sort" 
					@output="(value) => {filter = value}"
				/>

			</b-col>
			<b-col id="videos">				
				<h5 >Videos</h5>

				<Listing :cards="video.items"/>
				
				<Modal :_id="'modal-'+video._id" :video="video" v-for="(video, index) in video.items" :key="index"/>

				<div class="mb-4 lead" v-show="video.items.length === 0 && !$fetchState.pending">Sorry. No video has been found.</div>
				<div class="mb-4 lead" v-show="video.items.length === 0 && $fetchState.pending">
					<b-spinner small variant="light" type="grow" label="Spinning"></b-spinner>
					Loading ...
				</div>

				<b-row> 
					<b-col></b-col>
					<b-col>
						<b-button 
							v-show="video.items.length % 100 === 0 && video.items.length > 0" 
							squared 
							block 
							variant="outline-danger"
							@click="Skip"
							>See more
						</b-button>
					</b-col>
					<b-col></b-col>
				</b-row>
			</b-col>
		</b-row>
	</b-container>

</template>


<script> 
	import {mapState, mapGetters} from 'vuex';

	export default {

		layout: 'default',

		async asyncData({params}){
			const data = {
				sort : [{name: "New", state : true}, {name: "Popularity", state : false}],
				skip : 0,
				filter : 
				{

					categories : [], 
					actors : [],
					date : String, 
					rate : Number,
					sort : String, 
					time : Number,

				},				
			}
			if(params.filter === "popular") {
				data.sort = [{name: "New", state : false}, {name: "Popularity", state : true}]
				data.filter.sort = "Popularity"
			}
			if(params.filter === "actor") {
				console.log("params.name : actor",params.name)
				data.filter.actors = [params.name]
			}
			if(params.filter === "category") {
				data.filter.categories = [params.name]
				console.log("params.name : categories",params.name)
			}
			return data

		}, 
		async fetch() {
			this.$store.dispatch('video/eraseAll', this.skip === 0)
			await this.$store.dispatch('video/filter', {filter : this.filter, skip : this.skip})
		}, 
		fetchDelay : 2000,
		computed : {
			...mapState(['video']), 
		}, 
		methods : {
			Skip(){
				this.skip++
				this.$fetch()
			}
		},
		watch : {
			filter : {
				handler : function() {
					this.skip = 0
					this.$fetch()
				}, 
				deep : true
			},
		},
	}
</script>


<style scoped>
	

</style>
