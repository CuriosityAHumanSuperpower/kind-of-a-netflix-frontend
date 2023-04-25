<template>

	<b-collapse 
		:id="id"
		accordion="my-accordion"
		>
		<b-container fluid class="description" >
			<b-row align-h="end">
				<b-button 
					squared 
					variant="outline-light"
					v-b-toggle="id"
				>X</b-button>
			</b-row>

			<Description :video="video"/>

		</b-container>
	</b-collapse>

</template>


<script> 
	export default {
		props : {
			id : String, 
			video : Object
		}
	}
</script>

<style>
	

</style>
