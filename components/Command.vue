<template> 

	<b-collapse id="log" class="mt-2" v-model="isLogVisible">
		<b-row>	
			<b-col>
				<h5 class="title">
					Progress 
				</h5> 
				<b-progress :max="progress.max" height="1rem">
					<b-progress-bar 
						show-progress 
						:value="progress.value" 
						variant="success" 
						:animated="progress.value<progress.max">
					</b-progress-bar>
				</b-progress>
			</b-col>
		</b-row>

		<b-row> 
			<b-col>
				<h5 class="title">
					Logs 
				</h5> 
				<b-card bg-variant="light" text-variant="dark"> 
				  	<slot></slot>
				</b-card>
			</b-col>
		</b-row>
	</b-collapse>

</template>

<script>
	export default {

		props : {
			progress : {
				max : 100, 
				value : 33
			}, 
			isLogVisible : false
		}

	}
</script>