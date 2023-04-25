<template> 

	<b-card no-body text-variant="dark">
		<template #header>
			<h4 class="mb-0">{{title}}</h4>
		</template>
		<b-card-body>
			<b-row>
				<b-col> 
					<b-button variant="outline-danger" pill @click="run" v-show="avaliableRun" >Run <b-icon-play/></b-button>
					<b-button variant="outline-secondary" pill @click="refresh" v-show="avaliableRefresh">Refresh <b-icon-play/></b-button>
				</b-col>
				<b-col class="text-right">
					<p v-show="isLoading">
						<b-spinner small variant="dark" type="grow" label="Spinning"></b-spinner>
						Loading ...
					</p>
				</b-col>
			</b-row>
		</b-card-body>
		<b-list-group flush v-show="!isLoading">
			<b-list-group-item 
				variant="secondary"
				v-for="(value_, key_) in stats" :key="key_" :value="value_">
				{{key_}} : {{value_}}
			</b-list-group-item>
		</b-list-group>
		<b-list-group flush v-show="!isLoading" v-for="(element,index) in arrayOfStats" :key="index">
			<b-list-group-item variant="ligth" >{{element.name.toUpperCase()}}</b-list-group-item>
			<b-list-group-item variant="secondary" >State : {{element.isEnded ? 'stopped' : 'running'}}</b-list-group-item>
			<b-list-group-item 
				variant="secondary"
				v-for="(value_, key_) in element.currentState" :key="key_" :value="value_">
				{{key_}} : {{value_}}
			</b-list-group-item>
		</b-list-group>
	</b-card>

</template>

<script>
	export default {

		props : {
			stats : Object,
			arrayOfStats : Array,
			isLoading : false,
			title : String,
			avaliableRefresh : {type : Boolean, default : true},
			avaliableRun : {type : Boolean, default : true},
		},

		methods : {
			run(){
				this.$emit('run', true)		
			},
			refresh(){
				this.$emit('refresh', true)		
			}
		}
		
	}
</script>