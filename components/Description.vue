<template>

	<b-row class="description" >
		<b-col cols="12" lg="6">
 			<h2>{{video.title}}</h2>
 			<b-row>
 				<b-col>
 					<!-- <b-form-rating v-model="video.stars/20" readonly variant="warning" class="mb-2" no-border></b-form-rating> -->
 					<strong class="green">{{video.rate}} % popularity</strong>
 				</b-col>
 				<b-col><strong>{{video.time | timeFormat}}</strong></b-col>
 				<b-col><strong>{{video.date | dateFormat}}</strong></b-col>
 				<b-col><strong class="square">18+</strong></b-col>
 			</b-row>
  			<p>{{video.description}}</p>
  			<p v-show="video.actors.length > 0">
  				Actor{{video.actors.length>1 ? 's' : ''}} : 
  				<i v-for="actor in video.actors">
  					<NuxtLink :to="'/search/actor/'+actor+'#videos'" class="grey">{{actor}}</NuxtLink>&nbsp;
  				</i>
  			</p>
  			<p v-show="video.categories.length > 0">
  				Categor{{video.categories.length>1 ? 'ies' : 'y'}} : 
  				<i v-for="category in video.categories">
  					<NuxtLink :to="'/search/category/'+category+'#videos'" class="grey">{{category}}</NuxtLink>&nbsp;
  				</i>
  			</p>
  			<b-button squared variant="danger" to="#" target="_blank"><b-icon-play-circle/> PLAY</b-button>

  			<b-dropdown no-caret variant="outline-danger"> 
  				<template #button-content>
  					<b-icon icon="share" :pill="false"/>
  				</template>
  				<b-dropdown-item><Social network="twitter"><b-icon-twitter/> Twitter</Social></b-dropdown-item>
  				<b-dropdown-item><Social network="facebook"><b-icon-facebook/> Facebook</Social></b-dropdown-item>
  				<b-dropdown-item><Social network="Email"><b-icon-envelope/> Email</Social></b-dropdown-item>
  				<b-dropdown-item><Social network="WhatsApp"><b-icon-chat/> WhatsApp</Social></b-dropdown-item>
  				<b-dropdown-item><Social network="sms"><b-icon-chat-square-text/> SMS</Social></b-dropdown-item>
  			</b-dropdown>

 		</b-col>

<!-- 		<b-col 
			class="backgound-image-properties hidden-xs"
			:style="{'background-image' : 'linear-gradient(90deg, rgb(52, 58, 64) 0%, rgba(22, 147, 175, 0) 50%, rgba(0, 212, 255, 0) 100%), url('+video.image+')'}"
		> -->
		<b-col class="hidden-xs">
			<div class="gardiant">
				<b-img-lazy 
					:src="video.image" 
					:url="'https://xis-gay.herokuapp.com/video/'+video.id"
					fluid 
					center 
					v-if="!noImage"
					class="hundred-percent-width"
					v-bind="defaultImage"
				/>
			</div>
		</b-col>
	</b-row>

</template>

<script>
	export default {
		props : {
			video : Object, 
			noImage : {type : Boolean, default : false}
		}, 
		data(){
			return {
				defaultImage : {
					center: true,
					fluid : true, 
					blank: true,
					blankColor: '#bbb',
					class: "mb-2", 
					height: 150,
				}, 
			}
		},
		filters : {
			dateFormat(input){
				if(input){
					const date = new Date(input)
					return date.toLocaleString([], {year: 'numeric', month: 'long', day: 'numeric' }) || ""
				}
				return ""
			}, 
			timeFormat(input){
				var output = ""
				const timeConverter = [3600, 60, 1]
				for (var element of timeConverter){
					output += ("00" + Math.floor(input/element)).slice(-2) + ":"
					input = input % element
				}
				return output.slice(0, -1)
			}
		}, 
	}
</script>

<style>

/*DESCRIPTION*/

 	.description .green { 
 		color: #32de84; 
 	}

 	.description .grey { 
 		color: #CDCDCD; 
 	}

 	.description .square { 
 		border: 1px solid #f2f2f2; 
 	}

 	.description {
 		min-height: 320px;
 	}

 	.gardiant{
 		position: relative;
 	}

 	.gardiant:after {
 		content: '';
 		position: absolute;
 		left: 0;
 		top: 0;
 		width: 100%;
 		height: 100%;
 		background: linear-gradient(90deg, rgb(52, 58, 64) 0%, rgba(22, 147, 175, 0) 50%, rgba(0, 212, 255, 0) 100%);
 		z-index: 1;
 	}

 	.hundred-percent-width{
 		width: 100%;
 	}

</style>