<template>
  <div id="series_detail">
    <div class="zzc" v-show="flag_share"></div>
    <loading id="loading" v-if="!flag_c"></loading>
    <!-- 标题，分享按钮，返回按钮 -->
    <header  v-if="flag_c">
      <div class="return_series" @click="return_series">
        <img src="@/assets/return_-1.png" alt="" />
      </div>
      <div class="title">
        <!-- <p>{{ title }}</p> -->
        <p>【{{ title_fu }}】 {{ sp_info.title }}</p>
      </div>
      <div class="share" @click="share_cilck">
        <img src="@/assets/share.png" alt="" />
      </div>
    </header>
    <!-- 内容主体 -->
    <section  v-if="flag_c">
      <div class="top">
        <div class="img"  @click="play">
          <img :src="bigImg_url" v-if="!sori" alt="" />
          <video autoplay :src="video_detail.default.url" v-if="sori"></video>
        </div>
        <div class="text">
          <div class="title">
            <h3>{{ video_title }}</h3>
          </div>
          <div class="cont">
            <div id="fake" v-html="sp_info.msg">
              {{ sp_info.msg }}
            </div>
          </div>
          <div class="jieshao">
            <p :style="`${lookAll_flag ? 'display: -webkit-box;' : ''}`">
              {{ intro }}
            </p>
          </div>
          <div class="lookall">
            <span @click="look_all">{{
              lookAll_flag ? "查看全部  ∨" : "收起简介  ∧"
            }}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="btm_num">
          <span>1-{{ sp_num }}</span>
        </div>
        <div class="btm_list">
          <ul>
            <li @click="play_this(item.href,index)" v-for="(item, index) in sp_list" :key="index">
              <div class="btm_list_left">
                <img :src="item.img" alt="" />
                <span class="time">{{ item.duration }}</span>
                <div class="list_zzc" v-show="play_flag ==index">正在播放</div>
              </div>
              <div class="list_right">
                <p>{{ item.title }}</p>
                <span>{{ item.addtime }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 分享框 -->
    <footer>
      <share
        class="share1"
        @share_click="chilren_flag"
        :isVisible="flag_share"
      ></share>
    </footer>
  </div>
</template>
<script>
import loading from "@/views/compon/cate_compon/loading.vue";
import share from "@/views/compon/share_compon/share.vue";
export default {
  components: {
    loading,
    share,
  },
  data() {
    return {
      flag_share: false,
      lookAll_flag: true,
      flag_c:false,
      sori:false,
      play_flag:0,
      title: "",
      title_fu: "",
      fake_c: "",
      sp_list: [],
      sp_info: {},
      intro: "",
      sp_video: {},
      sp_num: 0,
      bigImg_url: "",
      chlick_list_url:'',
      video_detail:"",
      video_detail:""
    };
  },
  methods: {
    return_series() {
      this.$router.push("/classify_Series");
    },
    look_all() {
      this.lookAll_flag = !this.lookAll_flag;
    },
    play(){
      this.sori=!this.sori
    },
    // 点击弹出分享框
    share_cilck() {
      this.flag_share = true;
    },
    // 传值过去组件，关闭分享框
    chilren_flag(date) {
      this.flag_share = date;
    },
    play_this(href,index){
        this.chlick_list_url = href;
        this.sori = false;
        console.log( this.chlick_list_url);
        // console.log(index);
        this.play_flag=index;
        let that =this;
        let pros = axios.get(`https://apis.netstart.cn/vmovier/${href}`);
        pros.then(
            res => {
                // console.log(res.data.data);
                that.sp_video = res.data.data
                that.bigImg_url = that.sp_video.video.cover;
                that.video_title = that.sp_video.video.title;
                that.video_detail =  res.data.data.resource;
                console.log(that.video_detail);
            },
            err => {

            }
        )
    }
  },
  created() {
    console.log(this.$route.query);
    let id = this.$route.query.detail_id;
    this.title_fu = this.$route.query.detail_title;
    this.title = "";
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/series/${id}`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        that.sp_list = res.data.tvList;
        that.sp_info = res.data.info;
        that.intro = that.sp_info.intro.split("查看全部")[0];
        that.sp_video = res.data.data;
        that.video_title = that.sp_video.video.title;
        
        that.sp_num = that.sp_list.length;
        that.video_detail =  res.data.data.resource;
        console.log(that.video_detail);
        that.bigImg_url = that.sp_video.video.cover;
        // console.log(res.data);
        setTimeout(() => {
          that.flag_c = true
        }, 500);
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#series_detail {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  .zzc {
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 100%;
    z-index: 100;
    top:0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  header {
    width: 100%;
    height: 5%;
    background-color: black;
    display: flex;
    align-items: center;
    // justify-content: center;
    .return_series {
      height: 100%;
      width: 10%;
      img {
        position: absolute;
        left: 10px;
        top: 10px;
        height: 20px;
        width: 20px;
        vertical-align: middle;
      }
    }
    .title {
      width: 80%;
      height: 100%;
      p {
        position: absolute;
        left: 37px;
        top: 10px;
        padding: 0;
        width: 75%;
        margin: 0 auto;
        color: white;
        text-align: center;
        font-size: 16px;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
    .share {
      height: 100%;
      width: 10%;
      img {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 20px;
        width: 20px;
        vertical-align: middle;
      }
    }
  }
  section {
    height:95%;
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
    // background-color: red;
    .top {
      width: 100%;
      //   height: 60%;
      //   background-color: pink;
      .img {
        width: 88%;
        margin: 0 auto;
        background-color: black;
        position: relative;
        height: 183px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
        video{
          width: 100%;
          height: 100%;
          vertical-align: middle;
          position: absolute;
          top: 0;
          left: 0;
        } 
      }
      .text {
        width: 95%;
        margin: 0 auto;
        .title {
          width: 100%;
          h3 {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
        .cont {
          #fake >>> p {
            color: red;
            margin: 0;
            padding: 0;
          }
        }
        .jieshao {
          width: 100%;
          p {
            margin: 0;
            padding: 0;
            width: 100%;
            font-size: 13px;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing: 1px;
            // display:-webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .lookall {
          width: 100%;
          text-align: center;
          margin-top: 10px;
          span {
            font-size: 12px;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            color: rgb(156, 154, 156);
          }
        }
      }
    }
    .bottom {
      width: 100%;
      .btm_num {
        background-color: #f5f4f4;

        box-sizing: border-box;
        span {
          height: 30px;
          line-height: 30px;
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          border-bottom: 3px solid dodgerblue;
        }
      }
      .btm_list {
        width: 95%;
        margin: 0 auto;
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          width: 100%;
          height: 100%;
          li {
            width: 100%;
            height: 12.5%;
            border-bottom: 1px solid rgb(207, 205, 205);
            padding: 10px 0;
            display: flex;
            .btm_list_left {
              position: relative;
              width: 37.5%;
              .list_zzc {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  z-index: 3;
                  text-align: center;
                  line-height: 93px;
                  color: white;
                  font-size: 12px;
                  background-color: rgba(0, 0, 0,.4);
              }
              img {
                width: 100%;
                height: 100%;
              }
              .time {
                font-size: 12px;
                color: white;
                position: absolute;
                z-index: 4;
                bottom: 8px;
                right: 8px;
              }
            }
            .list_right {
              margin-top: 3px;
              margin-left: 7px;
              width: 62.5%;
              p {
                margin: 0;
                padding: 0;
                font-size: 15px;
                font-weight: bold;
                margin-bottom: 5px;
              }
              span {
                font-size: 12px;
                color: rgb(186, 181, 187);
              }
            }
          }
        }
      }
    }
  }
  footer {
    .share1 {
      position: fixed;
      z-index: 999;
      bottom: -1px;
      width: 100%;
      height: 24%;
      background-color: white;
    }
  }
}
</style>