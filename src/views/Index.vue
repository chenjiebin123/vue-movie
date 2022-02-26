<template>
  <div id="Index">
    <div class="nav">
      <div class="recommend" @click="toCover">
        <span class="date">{{ date }}</span>
        <img src="../assets/date.png" alt="" />
      </div>
      <router-link :to="{ path: '/find' }">发现</router-link>
      <router-link :to="{ path: '/channel' }">频道</router-link>
      <router-link :to="{ path: '/my' }">我的</router-link>
      <div class="search" @click="toSearch">
        <img src="../assets/search.png" alt="" />
      </div>
    </div>
    <!-- <div
      class="content"
      :style="`${
        flag == true ? 'transition:all .5s' : 'transition:none'
      }; transform:translateX(${moves}px)`"
      @touchstart="start"
      @touchmove="move"
      @touchend="end"
    >
      <find class="find"></find>
      <channel class="channel"></channel>
      <my class="my"></my>
     
      
    </div> -->
     <div class="box">
        <keep-alive>
        <router-view></router-view>
      </keep-alive>
      </div>
  </div>
</template>
<script>
import Find from "./compon/find.vue";
import Channel from "./compon/channel.vue";
import My from "./compon/my.vue";
export default {
  name: "Index_keep",
  components: {
    Find,
    Channel,
    My,
  },
  data() {
    return {
      date: "",
      flag: false,
      touch_startx: 0,
      touch_endx: 0,
      touch_starty: 0,
      touch_endy: 0,
      x: 0,
      y:0,
      moves: 0,
      m_ends: 0,
      banner_flag: true,
      index:0,
    };
  },
  methods: {
    get_date() {
      let time = new Date();
      this.date = time.getDate();
    },
    toCover() {
      this.$router.push("/recommend");
    },
    toSearch() {
      this.$router.push("/search");
    },
    start(evt) {
      console.log(evt.changedTouches[0]);
      this.flag = false;
      this.touch_startx = evt.changedTouches[0].clientX;
      this.touch_starty = evt.changedTouches[0].clientY;
      // console.log(this.touch_starty);
    },
    move(evt) {
      // console.log(evt.changedTouches[0].clientX);
      if (this.banner_flag == true) {
        this.x = this.touch_endx - this.touch_startx;
        this.y = this.touch_endy - this.touch_starty;
        this.touch_endx = evt.changedTouches[0].clientX;
        this.touch_endy = evt.changedTouches[0].clientY;
        // console.log(this.x);
        // console.log(Math.abs(this.x) ,Math.abs(this.y));
        if(Math.abs(this.x) >Math.abs(this.y)) {
          this.moves = this.touch_endx - this.touch_startx + this.m_ends;
        }
      }
    },
    end(evt) {
      // console.log(evt.changedTouches[0].clientX);
      this.flag = true
      let wind = window.innerWidth;
      if(this.x<0){
        if(Math.abs(this.x)>wind/3){
          this.index++;
          if(this.index >2) {
            this.index =2
          }
          this.moves = -this.index*wind
        }
        else{
          this.moves = -this.index*wind
        }
      }else {
        if(Math.abs(this.x)>wind/3){
          this.index--
          if(this.index < 0) {
            this.index = 0
          }
          this.moves = -this.index*wind
        }
        else{
          this.moves = -this.index*wind
        }
      }
      this.m_ends = this.moves;
    },
    myEnd() {},
  },
  created() {
    this.get_date();
  },
  // mounted(){
  //   this.get_listData()
  // }
};
</script>
<style lang="scss" scoped>
#Index {
  height: 100%;
  width: 100%;
  // background-color: black;
  padding-top: 11%;
  overflow: scroll;
  color: #fff;
    &::-webkit-scrollbar{
      display: none;
    }
    box-sizing: border-box;
  a {
    color: #fff;
    text-decoration: none;
  }
  .nav {
    height: 5%;
    width: 100%;
    background: rgb(27, 27, 27);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1000;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    a {
      font-size: 16px;
      height: 100%;
      line-height: 40px;
      &.router-link-exact-active {
        -webkit-tap-highlight-color: transparent;
        border-bottom: 2px solid #fff;
      }
      box-sizing: border-box;
    }
    .recommend {
      position: relative;
      .date {
        position: absolute;
        font-size: 12px;
        left: 14px;
        top: 7px;
      }
      img {
        height: 22px;
        width: 22px;
        margin-left: 10px;
        vertical-align: middle;
      }
    }
    .search {
      img {
        height: 24px;
        width: 24px;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
  .content {
    height: 95%;
    width: 300%;
    display: flex;
    transform: translateX(0);
    background-color: black;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    // .find ,.my ,.channel {
    //   float: left;
    // }
  }
}
</style>