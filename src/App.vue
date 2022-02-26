<template>
  <div id="app">
    <keep-alive include="Index_keep"><router-view class="view"></router-view></keep-alive>
    

    <!-- <router-view class="view"></router-view> -->
  </div>
</template>

<style lang="scss">
body,html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  // text-align: center;
  // color: #2c3e50;
}
.view {
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0);
}

</style>
