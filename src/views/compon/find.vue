<template>
  <div id="find" :style="`height:${wh}px`" @scroll="list_scroll" >
    <loading id="loading" v-show="!isShow"></loading>
    <!-- <div class="box" v-show="isShow"   ref="box">
      <banner :banner_list_name="b_list"></banner>
      <today :t_list="today_list"></today>
      <hot :t_list="today_list"></hot>
      <album></album>
      <posts @flag="aaa" :flag="load_flag"></posts>
    </div> -->
  </div>
</template>
<script>
import banner from "./children_compon/banner.vue";
import Hot from "./children_compon/hot.vue";
import today from "./children_compon/today.vue";
import album from "./children_compon/album.vue";
import posts from "./children_compon/posts.vue";
import loading from "@/views/compon/cate_compon/loading.vue";
export default {
  components: {
    banner,
    today,
    Hot,
    album,
    posts,
    loading,
  },
  data() {
    return {
      banner_list: [],
      today_list: [],
      b_list: "banner",
      isShow: false,
       wh:0,
      list_h:0,
      sy_height:0,
      load_flag:false
    };
  },
  // created() {
  //   let that = this;
  //   let url = `https://apis.netstart.cn/vmovier/index`;
  //   let pro = axios.get(url);
  //   pro.then(
  //     (res) => {
  //       if (res.status == "200") {
  //         that.banner_list = res.data.data.banner.list;
  //         that.today_list = res.data.data.today.list;
  //         // console.log(res.data.data);
  //         setTimeout(() => {
  //           that.isShow = true
  //         }, 500);
  //       }
  //       // console.log(res.data.data);
  //       // console.log(this.banner_list[0].image);
  //     },
  //     (err) => {}
  //   );
  // },
  methods:{
    load_more(){
      let viewHeight = document.documentElement;
      this.wh = viewHeight.clientHeight-40.6;
      // console.log("窗口高度", this.wh );
      
    },
    get_listData(){
      this.$nextTick(()=>{
      this.load_more();
    })
    },
    list_scroll(e){
      let box = this.$refs["box"];
      this.list_h = box.offsetHeight;
      this.sy_height = this.list_h-e.target.scrollTop-this.wh;
      // console.log(this.sy_height );
      if(this.sy_height < 50) {
        setTimeout(() => {
          this.load_flag = true;
        }, 500);
        // console.log(this.load_flag );
      }

    },
    aaa(val){
      // console.log(val);
      setTimeout(() => {
        this.load_flag = val;
      }, 1000);
    }

  },
  mounted(){
    this.get_listData()
  }
};
</script>
<style lang="scss" scoped>
#find {
  width: 100%;
   overflow: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
  #loading{
    position: absolute;
  }
}
</style>


