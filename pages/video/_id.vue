<template>

	<b-container>
		<b-row align-v="center" class="min-h-90-vh">
			<b-col align-self="center">
				<Description :video="video"/>
			</b-col>
		</b-row>
	</b-container>

</template>

<script>
	
	export default {

		async asyncData({ params, store }) {
			const video = await store.dispatch('video/fetchOne', params.id)
			return { video }
		}

	}

</script>

<style>

	.min-h-90-vh {
		min-height : 90vh
	}

</style>