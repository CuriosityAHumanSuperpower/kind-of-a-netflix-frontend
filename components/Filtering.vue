<template>

	<div>
		
		<b-button
			variant="outline-danger" 
			squared
			block 
			@click="reset()"
		>Reset
		</b-button>	
		<p></p>

		<p>Sort</p>
		<b-button-group size="sm" class="button-100-width">
			<b-button
				class="button-100-width"
				v-for="(btn, idx) in sort"
				:key="idx"
				:pressed.sync="btn.state"
				variant="outline-danger" 
				squared
				@click="sortState(idx)"
			>
				{{ btn.name }}
			</b-button>
		</b-button-group>

		<p></p>
		<p>Rating</p>
		<p><b-form-rating v-model="filter.rate" variant="warning" class="mb-2" no-border></b-form-rating></p>

		<b-form-group label="Date" v-slot="{ ariaDescribedby }">
			<b-form-radio-group
				plain
				v-model="filter.date"
				:options="dates"
				:aria-describedby="ariaDescribedby"
				name="radios-stacked"
				stacked
			></b-form-radio-group>
		</b-form-group>

		<b-form-group label="Duration" >
			 <b-form-select v-model="filter.time" :options="durations"></b-form-select>
		</b-form-group>

		<SelectorTag 
			label="Actors" 
			:value="filter.actors" 
			:options="actors" 
			@values="(values) => {filter.actors = values}"
			@search="(value) => {searchActor = value}"
		/>

		<SelectorTag 
			label="Categories" 
			:value="filter.categories" 
			:options="categories" 
			@values="(values) => {filter.categories = values}"
			@search="(value) => {searchCategory = value}"
		/>

	</div>				

</template>

<script>
	export default {
		props : {
			categories : {
				type : Array, 
				default : ()=>{ return [] }
			},
			dates : {
				type : Array, 
				default : ()=>{ return ["All", "Today", "Last 7 days", "Last 30 days", "Last year"] }
			},
			sort : {
				type : Array,
				default : ()=>{ return [{name: "New", state : true}, {name: "Popularity", state : false}] }
			},
			actors : {
				type : Array,
				default : ()=>{return []},
			},
			limit : 5,
			durations : {
				type : Array, 
				default : ()=>{return [
					{value: 0, text :"All"}, 
					{value: 300, text :"Over 5 minutes"}, 
					{value: 600, text :"Over 10 minutes"}, 
					{value: 1800, text :"Over 30 minutes"}, 
					{value: 3600, text :"Over 1 hour"},
					{value: 7200, text :"Over 2 hours"}
					]
				}
			},
			filter : {type : Object, default : {
				categories : [], 
				actors : [],
				date : String, 
				rate : Number,
				sort : String, 
				time : Number,
				}
			},
		}, 
		async fetch() {
			if(this.searchActor.length > 0){
				this.actors = []
				this.actors = await this.$store.dispatch("actor/search", this.searchActor)
				this.searchActor = ''
			}
			if(this.searchCategory.length > 0){
				this.categories = await this.$store.dispatch("category/search", this.searchCategory)
				this.searchCategory = ''
			}
		},
		data(){
			return {
				searchActor : "",
				searchCategory : "",
			}
		}, 
		methods:{
			sortState(idx){
				this.sort.forEach( (element, index) => {
					element.state = idx === index ? true : false
				})
				this.filter.sort = this.sort.filter((elem)=>{return elem.state===true})[0].name
			}, 
			reset(){
				Object.keys(this.filter).forEach(key => this.filter[key] = undefined)
				this.$router.push({path:"/search"})
			}
		},

		watch : {
			//ON CHANGE IN THE FORM INPUTS, WAIT SOME TIME AND EMIT FOR SEARCH
			filter : {
				handler : function() {
					this.$emit('output', this.filter)					 
				}, 
				deep : true
			}, 
			searchActor : "$fetch",
			searchCategory : "$fetch",
		}
	}
</script>

<style>
	
	.no-padding {
		padding : 2px !important;
	}
	
</style>