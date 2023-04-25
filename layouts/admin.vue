<template>
	<div> 
		<NavBar />
		<b-container fluid> 
			<h3 class="title">
				Dashboard 
			</h3> 
			<b-row class="flex-xl-nowrap">
				<b-col class="col-12 col-md-3 col-xl-2 bd-sidebar">
					<b-list-group flush>
					  <b-list-group-item 
					  	v-for="(list, index) in lists"
					  	:key="index"
					  	:to="{path : list.path}"
					  	:active="list.isActive"
					  	@click="Activate(index)"
					  	variant="secondary"
					  	>{{list.title}}
					  </b-list-group-item>
					</b-list-group>
				</b-col>
				<b-col class="col-12 col-md-9 col-xl-10 pl-md-5 bd-content">
					<Nuxt class="vue-body min-height"/>
				</b-col>
			</b-row>
		</b-container>

		<Footer />
	</div>
</template>

<script>

	export default {

		data() {
			return {
				lists : [
					{title : "Main", isActive : true, path : '/admin/'},
					{title : "Scrap New Videos", isActive : false, path : '/admin/new'},
					{title : "Delete broken links", isActive : false, path : '/admin/delete'},
				]
			}
		}, 

		methods : {
			Activate(index_){
				this.lists.forEach((list, index) => {
					list.isActive = index === index_ ? true : false
				})
			}
		}

	}
	
</script>

<style> 

.bd-sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 4rem;
    z-index: 1000;
    height: calc(100vh - 4rem);
}

</style>