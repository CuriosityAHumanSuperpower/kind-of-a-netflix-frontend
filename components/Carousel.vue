<template>

<b-container fluid ><!-- class="carousel" -->

	<h3 class="title"> {{title}} </h3>

	<div class="relative-position">
		<div class="swiper">
			<div class="swiper-wrapper ">
				<div 
					class="swiper-slide" 
					v-for="(video, index) in videos" :key="index"
					v-b-toggle="'collapse-'+video._id"
				>
<!-- 				<div 
					class="swiper-slide backgound-image-properties" 
					v-for="(video, index) in videos" :key="index"
					:style="{'background-image' : 'url('+video.image+')'}"
					v-b-toggle="'collapse-'+video._id"
				> -->
					<b-img-lazy 
						:src="video.image" 
						fluid 
						center 
						class="mb-2 card backgound-image-properties"
						v-bind="defaultImage"
					/>
				</div>
			</div>

			<!-- Add Pagination -->
			<!-- <div class="swiper-scrollbar"></div> -->

			<!-- Add Navigation buttons -->
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>

	<Collapse :id="'collapse-'+video._id" :video="video" v-for="(video, index) in videos" :key="index" v-if="!!video.title"/>


<!-- 	<div class="swiper">

		<div class="swiper-wrapper">
			<div 
				class="swiper-slide" 
				v-for="index in 10" :key="index" 
				:style="{'background-image' : 'url('+video.image+')'}"
			>
			</div>
		</div>
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
 -->
</b-container> 

</template>

<script>
	import Swiper, { Navigation, Pagination } from 'swiper'
	import 'swiper/swiper-bundle.css'

	Swiper.use([ Navigation, Pagination ])

	export default {
		mounted(){
			new Swiper('.swiper', {
				slidesPerView: 1,
				spaceBetween: 10,
				slidesPerGroup : 1,
				// init: false,
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				breakpoints: {
					300: {
						slidesPerView: 1,
						spaceBetween: 10,
						slidesPerGroup : 1,
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 10,
						slidesPerGroup : 2,
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 10,
						slidesPerGroup : 2,
					},
					1024: {
						slidesPerView: 5,
						spaceBetween: 10,
						slidesPerGroup : 4,
					},
				}
			});
		},

		props : {
			title : {type : String, default : "Videos"}, 
			videos : Array,
		}, 

		data() {
			return {
				visible : true, 
				visibleCollapse : false,
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
		}

	}
</script>

<style scoped>

	.relative-position {
		position: relative;
	}

	.swiper {
		padding : 20px 0;
	}

	.swiper-slide {
		height: 150px;
		width: 100%;

		transition : 250ms all; 
	}

	.swiper-slide:hover {
		transform : scale(1.2);
		z-index: 1;
	}

	.swiper-slide:first-child:hover {
		margin : 0 30px;
	}

	.swiper-slide:last-child:hover {
		margin : 0 -30px;
	}

	.swiper-button-prev, .swiper-button-next {
		color: #fff;
	}

	.card {
		background-color : transparent;
	}

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


/*IMAGE*/

 	.card {
 		padding : 0px;
 		height: 150px;
 		width: 100%;
 		border : none;
 		border-radius : 0em;

 		transition : 250ms all; 
 	}


</style>


