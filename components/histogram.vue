<template>
	<b-card :title="title_" bg-variant="light" text-variant="dark">
		<b-container> 
			<b-row v-for="(element, index) in values_" :key="index">
				<b-col cols="4">
					<p>{{element[keys_.key]}}</p>
				</b-col>
				<b-col>
					 <b-progress :max="max_" height="2rem" show-value :value="element[keys_.value]" />
				</b-col>
			</b-row>
		</b-container>			      				
	</b-card>
</template>

<script>
	export default {
		props : {
			title_ : '',
			max_ : 0,
			values_ : {type : Array, default(){ return [{title : '', value : 0}] }}, 
			keys_ : {type : Object, default(){ return {key : "_id", value : "total"} }}
		}
	}
</script>