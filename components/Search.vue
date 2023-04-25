<template> 

	<b-container fluid>

		<h3 class="title"> Search </h3>

		<b-row>
			<b-col cols="12" md="3" xl="2">

				<h5>Filters</h5>
					
				<Filtering 
					:filter="filter"
					:dates="dates" 
					:categories="categories" 
					:sort="sort" 
					:durations="durations"
					@output="(value) => {filter = value}"
				/>

			</b-col>
			<b-col>				
				<h5>Videos</h5>

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
							@click="$fetch"
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
		async asyncData({param}){
			const data = {
				sort :  [{name: "New", state : 1}, {name: "Popularity", state : 0}],
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
			return data

		}, 
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
					this.$emit('filter', this.filter)
					this.$emit('skip', this.skip)
				}, 
				deep : true
			},
		},
	}
</script>


