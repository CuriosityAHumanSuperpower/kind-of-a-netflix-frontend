<template> 
	<div>
		<b-container > 
			<b-row>
				<b-col> 
					<b-button variant="outline-danger" pill @click="$fetch" >Refresh <b-icon-arrow-counterclockwise/></b-button>
				</b-col>
				<b-col class="text-right">
					<p v-show="$fetchState.pending">
						<b-spinner small variant="light" type="grow" label="Spinning"></b-spinner>
						Loading ...
					</p>
				</b-col>
			</b-row>

		    <b-row class="py-md-3">
		    	<b-col>
			  		<b-row 
			  			align-v="start" 
			  			align-h="center"
			  			cols="1" cols-md="2" cols-lg="5"
			  			>
			  			<b-col 
			  				v-for="(element, index) in cards_"
			  				:key="index"
			  				>
			      			<b-card 
			      				
			      				:title="element.title" 
			      				:bg-variant="element.color" 
			      				:text-variant="element.ctext"
			      				class="text-center"
			      				>
			      				{{element.value}}
			      			</b-card>
			      		</b-col>
			  		</b-row>
			  	</b-col>
			</b-row> 
			<p></p>
		    <b-row>
		    	<b-col>
			  		<b-card-group deck>
			  			<histogram title_="Actors Update" :max_="maxActorUpdate_" :values_="stats.actor_update"/>
			  			<histogram title_="Broken Links Check" :max_="maxVideoUpdate_" :values_="stats.video_update"/>
			  		</b-card-group>
			  	</b-col>
			</b-row>
			<p></p>
			<b-row>
				<b-col> 
					<CommandPanel title="Schedule" :arrayOfStats="arrayOfStats.stats" :isLoading="arrayOfStats.isLoading" @run="RunSchedule()" @refresh="getLogs()"/>
				</b-col>
			</b-row>
			<p></p>
			<b-row>
				<b-col> 
					<CommandPanel title="Scrap new videos" :stats="new_.stats" :isLoading="new_.isLoading" @run="RunNew()" @refresh="getNewLog()"/>
				</b-col>
			</b-row>
			<p></p>
			<b-row>
				<b-col> 
					<!-- {{adfly_.stats}} -->

					<CommandPanel title="Ad Adfly" :stats="adfly_.stats" :isLoading="adfly_.isLoading" @run="RunAdfly()" @refresh="getAdflyLog()"/>
				</b-col>
			</b-row>
			<p></p>
			<b-row>
				<b-col> 
					<CommandPanel title="Delete Broken Links" :stats="delete_.stats" :isLoading="delete_.isLoading" @run="RunDelete()" @refresh="getDeleteLog()"/>
				</b-col>
			</b-row>
			<p></p>
			<b-row>
				<b-col> 
					<CommandPanel title="Update Actors" :stats="actors_.stats" :isLoading="actors_.isLoading" @run="RunActors()" @refresh="getActorsLog()"/>
				</b-col>
			</b-row>
			<p></p>
			<b-row>
				<b-col> 
					<CommandPanel title="Update Categories" :stats="categories_.stats" :isLoading="categories_.isLoading" @run="RunCategories()" @refresh="getCategoriesLog()"/>
				</b-col>
			</b-row>
			<p></p>
			<b-row>
				<b-col> 
					<CommandPanel title="Refresh" :stats="refresh_.stats" :isLoading="refresh_.isLoading" @run="RunRefresh()" avaliableRefresh="false"/>
				</b-col>
			</b-row>

		</b-container>
	</div>
</template>

<script>
	
export default {

	layout: 'default',

	middleware : 'auth-admin',

	data(){
		return {
			arrayOfStats : {
				stats : [],
				isLoading : false,
			},
			new_ : {
				stats : {},
				isLoading : false,
			},
			adfly_ : {
				stats : {},
				isLoading : false,
			},
			delete_ : {
				stats : {},
				isLoading : false,
			},
			actors_ : {
				stats : {},
				isLoading : false,
			},
			categories_ : {
				stats : {},
				isLoading : false,
			},
			refresh_ : {
				stats : {},
				isLoading : false,
			},
			stats : {
				total: [{total : ''}],
				total_actors: [{value : ''}],
				total_categories: [{value : ''}],
				adfly: [{total : ''}],
				views: [{_id : '', total : ''}],
				video_update: [{_id : '', total : 0}],
				actor_update: [{_id : '', total : 0}],
			},
			tables : {
				times : {
					0 : "0 to 1 min", 
					60 : "1 to 2 min", 
					120 : "2 to 5 min", 
					300 : "5 to 10 min", 
					600 : "10 to 20 min", 
					1200 : "20 to 30 min", 
					1800 : "30 to 1 hour",
					3600 : "1 to 2 hours", 
					7200 : "3 to 3 hours", 
					10800 : "Over 3 hours", 
				}
			}

		}
	},

	computed : {
/*		times_(){
			return this.stats.times.map(element => {return {_id : this.tables.times[element._id], total : element.total}})
		}, */
		maxActorUpdate_(){
			const array_ = this.stats.actor_update?.map(element => {return element.total})
			return Math.max(...array_)
		}, 
		maxVideoUpdate_(){
			const array_ = this.stats.video_update.map(element => {return element.total})
			return Math.max(...array_)
		}, 
		cards_(){
			return [
				{ title : "Video", color : "success", ctext :"white", value : this.stats.total[0].total}, 
				{ title : "Actors", color : "info",ctext :"white", value : this.stats.total_actors[0].value}, 
				{ title : "Categories", color : "warning",ctext :"white", value : this.stats.total_categories[0].value}, 
				// { title : "Links", color : "light",ctext :"dark", value : this.stats.out[0].total}, 
				{ title : "Adfly", color : "secondary",ctext :"white", value : this.stats.adfly[0].total}, 
				{ title : "Views", color : "danger",ctext :"white", value : this.stats.views[0].total} 
			]
		}
	},

	async fetch(){
		this.stats = await this.$store.dispatch("video/stats")
	}, 

	mounted(){
		this.UpdateLogs()
	},

	methods : {
		async UpdateLogs(){
			setInterval(this.getLogs(), 600000);
		},
		async getLogs(){
			this.arrayOfStats.stats = await this.$store.dispatch("log/fetchMany")
		},
		async getAdflyLog(){
			this.adfly_.isLoading = true
			this.adfly_.stats = await this.$store.dispatch("log/fetchOne", "adfly")
			this.adfly_.isLoading = false
		},
		async getNewLog(){
			this.new_.isLoading = true
			this.new_.stats = await this.$store.dispatch("log/fetchOne", "new")
			this.new_.isLoading = false
		},
		async getDeleteLog(){
			this.delete_.isLoading = true
			this.delete_.stats = await this.$store.dispatch("log/fetchOne", "delete")
			this.delete_.isLoading = false
		},
		async getActorsLog(){
			this.actors_.stats = await this.$store.dispatch("log/fetchOne", "actors")
		},
		async getCategoriesLog(){
			this.categories_.stats = await this.$store.dispatch("log/fetchOne", "categories")
		},
		async RunRefresh(){
			this.refresh_.stats = await this.$store.dispatch("user/refresh")
		},
		RunNew(){
			this.$store.dispatch("video/scrapNew")
		},
		RunSchedule(){
			this.$store.dispatch("video/schedule")
		},
		RunAdfly(){
			this.$store.dispatch("video/adfly")
		},
		RunDelete(){
			this.$store.dispatch("video/broken")
		},
		async RunActors(){
			await this.$store.dispatch("actor/update")
		},
		RunCategories(){
			this.$store.dispatch("category/update")
		},
	}
}


</script>