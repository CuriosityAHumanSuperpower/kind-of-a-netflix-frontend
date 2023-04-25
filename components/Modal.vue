<template>


	<b-modal 
		:id="_id" 
		size="xl" 
		scrollable 
		centered 
		no-stacking
		hide-header
		hide-footer
	> 
		
		<b-container fluid class="description" >
			<b-row align-h="end">
				<c-col >
					<b-button 
						squared 
						variant="outline-light"
						@click="hideModal()"
					>X</b-button>
				</c-col>
			</b-row>

			<Description :video="video"/>

		</b-container>

	</b-modal>

</template>

<script> 
	export default {
		props : {
			_id : String, 
			video : Object
		}, 
		methods : {
			hideModal() {
	        	this.$bvModal.hide(this._id)
	      	},
		}
	}

</script>

<style >

	.modal-content {
		background-color: #343a40;
	}

</style>