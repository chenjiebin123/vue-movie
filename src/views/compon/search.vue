<template>
  <div id="search">
    <header class="header">
      <div class="left">
        <img src="@/assets/search.png" alt="" class="search" />
        <input 
        type="text" 
        v-model="inp_val" 
        placeholder="请输入要搜索的内容"
        @keydown.enter="search"
         />
        <img
          src="@/assets/clear.png"
          alt=""
          class="clear"
          @click="clear_input"
          v-show="inp_val ? true : false"
        />
      </div>
      <div class="right">
        <button @click="toprev">取消</button>
      </div>
    </header>
    <footer>
        <fontsearch @aaa="fonttext" v-show="!flag"></fontsearch>
        <searchcont :tj="kw"  v-show="flag"></searchcont>
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
    </footer>
  </div>
</template>
<script>
import fontsearch from "@/views/compon/search_compon/font_search.vue";
import searchcont from "@/views/compon/search_compon/search_cont.vue";

export default {
  components: {
      fontsearch,
      searchcont,
  },
  data() {
    return {
      detele_flag: false,
      inp_val: "",
      kw:"",
      flag:false
    };
  },
  watch: {
    inp_val(val) {},

  },
  methods: {
    clear_input() {
      this.inp_val = "";
      this.flag = false
    },
     search(){
       if(this.inp_val == "") return;
        // this.getlist(this.inp_val)
        this.kw = this.inp_val;
        // console.log(this.kw);
        this.flag = true
    },
    fonttext(obj){
        console.log(obj);
        this.inp_val=obj.str;

        this.kw = obj.str;
        // console.log(this.kw);
        this.flag = obj.flag
        // console.log(this.flag);
    },
    toprev() {
      this.$router.push("/channel");
    },
   
  },
  created() {
    //   console.log(this.$route.query);
  },
};
</script>
<style lang="scss" scoped>
#search {
  height: 100%;
  width: 100%;
  background-color: rgb(20, 20, 20);
  .header {
    // background-color: pink;
    width: 100%;
    height: 8%;
    border-bottom: 1px solid rgb(80, 80, 80);
    padding: 3% 5%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      height: 78%;
      background-color: rgb(40, 40, 40);
      flex-grow: 1;
      display: flex;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      .search {
        height: 20px;
        width: 20px;
      }
      input {
        background-color: transparent;
        border: none;
        outline: none;
        flex-grow: 1;
        caret-color: white;
        height: 100%;
        font-size: 16px;
        color: rgb(140, 140, 140);
      }
      .clear {
        height: 20px;
        width: 20px;
      }
    }
    .right {
      height: 80%;
      width: 13%;
      // background-color: blue;
      button {
        background-color: transparent;
        display: block;
        border: none;
        height: 100%;
        width: 100%;
        font-size: 17px;
        text-align: right;
        padding: 0;
        color: rgb(140, 140, 140);
      }
    }
  }
  footer {
      height: 92%;
      width: 100%;
      overflow: scroll;
      &::-webkit-scrollbar{
          display: none;
      }
  }
}
</style>