<template>

	<div>
		<b-container>
			<b-row cols="1" cols-sm="2" cols-lg="3" cols-xl="4" align-h="center"> <!--  -->
				<b-col						
					v-for="(card, index) in cards" :key="index"
					:class="isActor ? 'max-width-10em' : ''"
					@click="GoTo(card)"
					class="pointer"
				>
<!-- 
					v-b-modal="'modal-'+card._id"
					<div 
						class="mb-2 card backgound-image-properties"
						:class="noImage ? 'noImage' : ''"
						:style="{'background-image' : 'url('+card.image+')'}"
					>
					</div> 
-->
					<b-img-lazy 
						:src="card.image" 
						fluid 
						center 
						class="mb-2 card backgound-image-properties"
						v-if="!noImage"
						v-bind="defaultImage"
					/><!-- @error="imageError" -->
					<p v-if="card.name">{{card.name}}</p>	

				</b-col>
			</b-row>
		</b-container>
	</div>
	
</template>

<script>
	export default {
		props : {
			cards : Array,
			isRouter : {type: Boolean, default : false}, //ON TRUE ON CLICK ON THE IMAGE, GO TO
			isActor : {type: Boolean, default : false},
			isCategory : {type: Boolean, default : false},
			isModal : {type: Boolean, default : true},
			noImage : {type: Boolean, default : false} 
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
				}
			}
		},
		methods : {
			GoTo(card){
				if(this.isRouter){
					return this.$router.push({path : card.link})
				}
				if(this.isCategory){
					return this.$router.push({path : `/search/category/${card.name}#videos` })
				}
				if(this.isActor){
					return this.$router.push({path : `/search/actor/${card.name}#videos` })
				}
				if(this.isModal){
					return this.$bvModal.show('modal-'+card._id)
				}
			}, 
/*			imageError(event) {
			    event.target.src = "~assets/logo/logo.png"
			}
*/		}

	}
</script>

<style scoped>

/*	.button-100-width {
		width : 100%
	}*/

	.max-width-20em {
		max-width: 20rem
	}

	.max-width-10em {
		max-width: 10rem
	}

	.card {
		padding : 0px;
		height: 150px;
		width: 100%;
		border : none;
		border-radius : 0em;

		transition : 250ms all; 
	}

	.noImage {
		padding : 0px;
		height: 0px;		
	}

	.card:hover {
		transform : scale(1.1);
		z-index: 1;
	}

</style>