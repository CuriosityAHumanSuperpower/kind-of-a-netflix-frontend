<template>
  <div>

    <FullPageLoading v-if="isLoading"/>

    <client-only v-else>
      <Carousel title="Random" :videos="video.homePageItems[0]"/>
      <Carousel title="Popular" :videos="video.homePageItems[1]"/>
      <Carousel title="New" :videos="video.homePageItems[2]"/>
    </client-only>

  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  export default {
    mounted(){
      this.setTimeoutClose() 
    },
    async asyncData({store}){
      await store.dispatch("video/fetchHomePage")
      return {
        isLoading : 0
      }
    }, 
    computed : {
      ...mapState(['video']),
    }, 
    methods : {
      setTimeoutClose() {
        this.isLoading = setTimeout(()=>{this.isLoading = false}, 2000)
      }
    }

  }
</script>

<style>

</style>
