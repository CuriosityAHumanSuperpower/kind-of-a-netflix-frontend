<template>
  <div>
    <Nuxt class="vue-body min-height"/>
    <Footer />
  </div>
</template>

<script>

</script>

<style>

/*DEFAULT CSS*/
  
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #343a40 !important;
  overflow-x: hidden;
} 

body {
  background-color: #343a40 !important;
  padding-top: 60px;
  color : white;
}

.min-height {
  min-height : 90vh
}

.form-control {
  background-color : transparent;
}

.title {
  color : #6c757d;
  font-family: Helvetica, sans-serif !important;
  padding-top: 30px;
}

.backgound-image-properties {
  background-color: gray;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border :none;
  border-radius: 0px;   
}

.container-secondary {
  background-color : #40464b  ;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 0rem; 
  margin-bottom: 0rem
}

  .pointer {
    cursor: pointer;
  }

</style>