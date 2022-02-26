<template>
  <div id="album">
    <div class="title">
      <div class="text">专题</div>

      <router-link to="/classify_ablum">more</router-link>
      </div>
      <banner :banner_list_name="a_list"></banner>
    
  </div>
</template>
<script>
import banner from "./banner.vue";
export default {
    components:{
        banner
    },
    data(){
        return {
            a_list:'album'
        }
    }
};
</script>
<style lang="scss" scoped>
#album {
    width: 100%;
  .title {
    width: 100%;
    overflow: hidden;
    position: relative;
    .text {
      width: 100%;
      height: 50px;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      background-color: black;
    }
    a {
      position: absolute;
      top: 50%;
      margin-top: -10px;
      right: 10px;
      -webkit-tap-highlight-color: transparent;
      text-decoration: none;
      color: #c3c3c3;
      display: block;
      font-size: 14px;
    }
  }
}
</style>