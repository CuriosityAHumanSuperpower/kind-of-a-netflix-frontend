<template> 

	<b-container fluid>

		<h3 class="title"> Search </h3>

		<b-row>
			<b-col cols="12" md="3" xl="2">

				<h5>Filters</h5>
					
				<Filtering 
					:dates="dates" 
					:categories="categories" 
					:sort="sort" 
					:durations="durations"
					@output="(value) => {filter = value}"
				/>

			</b-col>
			<b-col>				
				<h5>Videos</h5> {{filter}} {{skip}}

				<Listing :cards="video.items"/>
				
				<Modal :id="'modal-'+video._id" :video="video" v-for="video in video.items" :key="video"/>

				<div class="mb-4 lead" v-show="video.items.length === 0">Sorry. No video has been found.</div>

				<b-row> 
					<b-col></b-col>
					<b-col>
						<b-button 
							v-show="video.items.length > 99" 
							squared 
							block 
							variant="outline-danger"
							@click="()=>{skip++}"
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
		props : {
			skip : {type : Number, default : 0},
			filter : Object,
			sort : [{name: "New", state : 1}, {name: "Popularity", state : 0}],
		}, 
/*		async asyncData({ route }){
			const output = {
				filter : {},
				
			}
			const query = route.query || false
			if(!!query && query.filter) {
				output.filter = query.filter
				if(output.filter.sort === "Popularity"){
					output.sort[0].state = 0
					output.sort[1].state = 1
				}
			}
			return output
		},*/
		async fetch() {
			await this.$store.dispatch('video/filter', {filter : this.filter, skip : this.skip})
		}, 
		computed : {
			...mapState(['video']), 
		}, 
		watch : {
			filter : {
				handler : function() {
					this.skip = 0
					this.$fetch()
				}, 
				deep : true
			},
			skip : "$fetch",  
		}
	}
</script>


<style scoped>
	

</style>