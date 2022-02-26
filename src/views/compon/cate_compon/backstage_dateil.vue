<template>
  <div id="backstage_detail">
    <div class="zzc" v-show="flag_share"></div>
    <loading id="loading" v-if="!isShow"></loading>

    <header>
        <div class="return_backstage" @click="return_backstage">
          <img src="@/assets/return-2.png" alt="" />
        </div>
        <div class="title">
          <p>{{ obj.title }}</p>
        </div>
      </header>
    <div class="box" v-if="isShow">
      
      <section class="section1" ref="section1" @scroll="section_scroll">
        <div class="title">
          <h3>{{ obj.title }}</h3>
        </div>
        <ul>
          <li v-for="(item, aaa) in obj.format_content" :key="aaa">
            <div v-if="item.type == 'normal'">
              <p
                :style="`color:#${item.attr.color};font-size:15px;text-align:${
                  item.attr.align == 'center' ? item.attr.align : 'left'
                }`"
              >
                {{ item.content }}
              </p>
            </div>
            <div v-else-if="item.type == 'title'">
              <p
                :style="`color:#${item.attr.color};font-size:${
                  item.attr.size
                };text-align:${
                  item.attr.align == 'center' ? item.attr.align : 'left'
                }`"
              >
                {{ item.content }}
              </p>
            </div>
            <div class="img"  v-else-if="item.type == 'image'">
              <img :style="`width:100%`" :src="item.attr.src" alt="" />
            </div>
            <div class="video" @click="play_video" v-else>
              <img
                v-if="video_flag"
                :src="obj.content_video[item.attr.index].image"
                style="width: 100%"
                alt=""
              />
              <img
                v-if="video_flag"
                class="play"
                :src="require(`@/assets/${icon_flag ? 'play' : 'pause'}.png`)"
                alt=""
              />
              <video
                v-if="!video_flag"
                autoplay
                controls
                ref="video"
                :src="obj.content_video[item.attr.index].progressive[0].url"
                style="width: 100%"
              ></video>
            </div>
          </li>
        </ul>
        <div class="write">
          <span>by {{ edit.username }}</span>
        </div>
      </section>
      <div class="input">
        <div class="left">
          <input type="text" />
        </div>
        <div class="right">
          <div class="like">
            <img src="@/assets/like.png" alt="" />
            <span>{{ obj.count_like }}</span>
          </div>
          <div class="share" @click="share_cilck">
            <img src="@/assets/redblue.png" alt="" />
            <span>{{ obj.count_share }}</span>
          </div>
        </div>
      </div>
      <footer>
        <share
          class="share1"
          @share_click="chilren_flag"
          :isVisible="flag_share"
        ></share>
      </footer>
    </div>
  </div>
</template>
<script>
import loading from "@/views/compon/cate_compon/loading.vue";
import share from "@/views/compon/share_compon/share.vue";
export default {
  components: {
    share,
    loading,
  },
  data() {
    return {
      flag_share: false,
      isShow: false,
      icon_flag: true,
      video_flag: true,
      title: "",
      text_list: [],
      video_list: [],
      edit: {},
      obj: {},
    };
  },
  created() {
    let id = this.$route.query.id;
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/post/view?postid=${id}`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        that.obj = res.data.data;
        that.edit = res.data.data.editor;
        //   console.log(that.obj.content_video[0].source_link);
        setTimeout(() => {
          that.isShow = true
        }, 500);
        // console.log(res.data.data);
      },
      (err) => {}
    );
  },
  methods: {
    chilren_flag(data) {
      // console.log(data);
      this.flag_share = data;
    },
    share_cilck() {
      this.flag_share = true;
    },
    return_backstage() {
      // this.$router.push("/classify_ablum");
      this.$router.go(-1);
    },
    play_video() {
      this.video_flag = !this.video_flag;
    },
    section_scroll(e) {
      let section1 = this.$refs["section1"];
      // console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
#backstage_detail {
  width: 100%;
  height: 100%;
  // padding-top: 11%;
  box-sizing: border-box;
  background-color: #fff;
  overflow: scroll;
  &::-webkit-scrollbar {
      display: none;
    }
  .zzc {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
  }
  header {
    width: 100%;
    height: 5%;
    background-color: rgb(255, 255, 255,);
    display: flex;
    align-items: center; 
    .return_backstage {
      height: 100%;
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 18px;
        width: 18px;
        vertical-align: middle;
      }
    }
    .title {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        width: 75%;
        margin: 0 auto;
        color: black;
        text-align: center;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  .box {
    height: 95%;
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    section {
    width: 95%;
    height: 88%;
    margin: 0 auto;
    overflow: scroll;
    // padding-top: 30%;
    box-sizing: border-box;
    .title {
      margin-top: 10%;
      h3 {
        width: 80%;
        margin: 0 auto;
        text-align: center;
      }
    }
    ul {
      width: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        width: 100%;
        margin-bottom: 35px;
        div {
          width: 100%;
          p {
            width: 100%;
            word-wrap: break-word;
            // overflow : hidden ;
          }
        }
        .img {
          width: 100%;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
        .video {
          background-color: black;
          position: relative;
          img {
            vertical-align: middle;
          }
          video {
            vertical-align: middle;
          }
          .play {
            height: 32px;
            width: 32px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -16px;
            margin-top: -16px;
          }
        }
      }
    }
    .write {
      width: 100%;
      text-align: center;
      span {
        display: block;
        height: 80px;
        line-height: 80px;
        color: #999999;
      }
    }
  }
  .input {
    position: fixed;
    bottom: 0px;
    height: 7%;
    background-color: #fff;
    width: 100%;
    padding: 5px 10px 0;
    box-sizing: border-box;
    display: flex;
    .left {
      width: 55%;
      input {
        border-radius: 20px;
        margin-top: 8px;
        height: 25px;
        width: 100%;
        border: 1px solid #999999;
        outline: none;
        padding-left: 10px;
      }
    }
    .right {
      width: 45%;
      display: flex;
      justify-content: space-evenly;
      margin-left: 10px;
      .like,
      .share {
        width: 50px;
        margin: 5px;
        img {
          display: block;
          margin: 0 auto;
          height: 16px;
          width: 16px;
        }
        span {
          width: 100%;
          text-align: center;
          display: block;
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
}
</style>