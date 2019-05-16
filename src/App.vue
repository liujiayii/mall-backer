<template>
  <div id="app" class="animated lightSpeedIn">
    <transition name="fade" mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated hinge">
      <router-view/>
    </transition>
  </div>
</template>
<script>
  import './assets/global.less'
  export default {}
</script>
<style>
  html, body, #app {
    height: 100%;
    width: 100%;
    font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
