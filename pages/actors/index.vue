<template>

	<div>

		<b-sidebar 
			id="sidebar-alphabet" 
			shadow 
			right 
			backdrop
			width="75px"
			>
			<b-list-group>
				<b-list-group-item
					v-for="letter in alphabet" 
					:key="letter" 
					:href="'#cat-'+letter"
					variant="transparent"
				>{{letter}}
				</b-list-group-item>
			</b-list-group>			
		</b-sidebar>

		<b-button 
			class="sidebar-alphabet" 
			v-b-toggle.sidebar-alphabet
			variant="danger"
		>A-Z
		</b-button>
		
		<b-container fluid>
			<p><h3 class="title"> Actors <small>({{actor.length}})</small></h3></p>
		</b-container>
		
		<Listing :cards="actor.topItems" :isActor="true"/>

		<b-jumbotron 
			class="container-secondary"
			v-for="(item,index) in actor.items"
			:key="index"
			:id="'cat-'+item._id"
			:header="item._id"
			:fluid="true"
			>
			<b-row  >
				<b-col> 
					<!-- <p v-for="(element, index) in item.array" :keys="index" @click="GoTo(element)" class="pointer">{{element}}</p> -->
					<p v-for="(element, index) in item.array" :keys="index">
						<NuxtLink :to="'/search/actor/'+element+'#videos'" class="grey">{{element}}</NuxtLink>
					</p>
				</b-col>
			</b-row>
		</b-jumbotron>

	</div>
	
</template>

<script>
	import {mapState, mapGetters} from 'vuex';

	export default {
		layout: 'default',
		async asyncData({store}) {
			await store.dispatch('actor/fetchRandomTop')
			await store.dispatch('actor/fetchMany')
			await store.dispatch('actor/fetchTotalNb')
		}, 
		computed : {
			...mapState(['actor']), 
			...mapGetters({
				alphabet : "actor/getAlphabet"
			})
		}, 
/*		methods : {
			GoTo(name){
				this.$router.push({path : `/search/actor/${name}#videos`})
			}
		}*/

	}
</script>

<style>

	.sidebar-alphabet {
		position: fixed;
		bottom: 10px;
		right: 10px;
		z-index: 1000;
	}

	.grey {
		color: #CDCDCD; 
	}

	.grey:hover {
		color: #CDCDCD; 
	}

	
</style>