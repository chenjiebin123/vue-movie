<template>
  <div id="ordinary">
    <div class="zzc" v-show="flag_share"></div>
    <loading id="loading" v-if="!isShow"></loading>
    <div class="box" v-if="isShow">
      <!-- 标题，分享按钮，返回按钮 -->
      <header>
        <div class="return_prev" @click="return_prev">
          <img src="@/assets/return_-1.png" alt="" />
        </div>
        <div class="title"></div>
        <div class="share" @click="share_cilck">
          <img src="@/assets/share.png" alt="" />
        </div>
      </header>
      <!-- 内容主体 -->
      <div class="top">
        <video controls :src="big_url"></video>
      </div>
      <section>
        <div class="text">
          <div class="title">
            <h3>{{ obj.title }}</h3>
          </div>
          <div class="time">
            <span
              >{{ leibie }} /
              {{
                Math.floor(obj.duration / 60) > 9
                  ? Math.floor(obj.duration / 60)
                  : "0" + Math.floor(obj.duration / 60)
              }}′{{
                obj.duration % 60 > 10
                  ? obj.duration % 60
                  : "0" + (obj.duration % 60)
              }}″</span
            >
          </div>
          <div class="content">
            <p>{{ obj.intro }}</p>
          </div>
        </div>
        <div class="link">
          <span class="to_detail" @click="to_detail_all(obj.postid)"
            >阅读全文→</span
          >
        </div>
        <div class="write" v-if="obj.author ? true : false">
          <div class="left">
            <img :src="write_obj.avatar" alt="" />
          </div>
          <div class="center">
            <h4>{{ write_obj.username }}</h4>
            <p>片中职务:{{ write_work }}</p>
          </div>
          <div class="right">
            <img src="@/assets/to.png" alt="" />
          </div>
        </div>
        <div class="bottom">
          <ul>
            <li v-for="item in obj.relate_video" :key="item.id">
              <div class="title">
                <div class="left">{{ item.name }}</div>
                <div class="right">more</div>
              </div>
              <div class="video_list">
                <ol>
                  <li
                    v-for="s_item in item.list"
                    :key="s_item.postid"
                    @click="to_detail(s_item.postid)"
                  >
                    <img :src="s_item.image" alt="" />
                    <span class="time"
                      >{{
                        Math.floor(s_item.duration / 60) > 9
                          ? Math.floor(s_item.duration / 60)
                          : "0" + Math.floor(s_item.duration / 60)
                      }}′{{
                        s_item.duration % 60 > 10
                          ? s_item.duration % 60
                          : "0" + (s_item.duration % 60)
                      }}″</span
                    >
                    <span class="text">{{ s_item.title }}</span>
                  </li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
        <div class="pl_list">
          <div class="title">
            <span>{{comment_obj.total}}条评论</span>
          </div>
          <div class="pl">
            <ul>
              <li v-for="item in comment_list" :key="item.commentid">
                <div class="pl_box">
                  <div class="pl_left">
                    <img :src="item.userinfo.avatar" alt="" />
                  </div>
                  <div class="pl_right">
                    <div class="pl_top">
                      <p>{{ item.userinfo.username }}</p>
                      <div class="good_num">
                        <img src="@/assets/good.png" alt="" />{{item.count_approve}}
                      </div>
                    </div>
                    <div class="pl_bottom">
                      <h4>
                        {{ item.content }}
                      </h4>
                      <ol>
                        <li v-for="item2 in item.subcomment" :key="item2.commentid">
                          <div class="pl_box2">
                            <div class="pl_left">
                              <img
                                :src="item2.userinfo.avatar"
                                alt=""
                              />
                            </div>
                            <div class="pl_right">
                              <div class="pl_top">
                                <p>{{item2.userinfo.username}}</p>
                                <div class="good_num">
                                  <img src="@/assets/good.png" alt="" />{{item2.count_approve}}
                                </div>
                              </div>
                              <div class="pl_bottom">
                                <div class="huifu">
                                  <span>回复</span><span>{{item2.reply_userinfo.username}}</span
                                  ><span>:</span>
                                </div>
                                <h4>
                                  {{ item2.content }}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <!-- 评论区域 -->
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
      <!-- 分享框 -->
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
    loading,
    share,
  },
  data() {
    return {
      isShow: false,
      flag_share: false,
      obj: {},
      leibie: "",
      write_obj: {},
      write_work: {},
      comment_obj: {},
      comment_num: {},
      comment_list: [],
      vieo_list: {},
      big_url: "",
      _id: "",
      detail_id: "",
    };
  },
  methods: {
    return_prev() {
      this.$router.go(-1);
    },
    share_cilck() {
      this.flag_share = true;
    },
    chilren_flag(data) {
      // console.log(data);
      this.flag_share = data;
    },
    get_data(id) {
      let that = this;
      let url = `https://apis.netstart.cn/vmovier/post/view?postid=${id}`;
      let pro = axios.get(url);
      pro.then(
        (res) => {
          that.obj = res.data.data;
          if (that.obj.author) {
            that.write_obj = res.data.data.author.profile;
            that.write_work = res.data.data.author.roles;
          }
          if (that.obj.comment.total != 0) {
            that.comment_obj = that.obj.comment;
            // console.log(that.comment_obj);
            that.comment_list = that.obj.comment.list;
            that.comment_num = that.obj.comment.total;
          }
          that.leibie = res.data.data.cate[0];
          that.vieo_list = res.data.data.content_video;
          that.big_url = that.vieo_list[0].source_link;
          // console.log(res.data.data);
          setTimeout(() => {
            that.isShow = true;
          }, 500);
        },
        (err) => {}
      );
    },
    to_detail(id) {
      // console.log(id);
      this._id = id;
      this.get_data(this._id);
    },
    to_detail_all(postid) {
      this.$router.push({ path: "/backstage_dateil", query: { id: postid } });
      // console.log(postid);
    },
  },
  created() {
    this._id = this.$route.query.id;
    // console.log(this._id);
    this.get_data(this._id);
  },
};
</script>
<style lang="scss" scoped>
#ordinary {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
  background-color: white;
  .zzc {
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .box {
    height: 100%;
    width: 100%;
    header {
      width: 100%;
      height: 5%;
      background-color: rgba(0, 0, 0, 0);
      display: flex;
      position: absolute;
      z-index: 99;
      align-items: center;
      // justify-content: center;
      .return_prev {
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
    .top {
      width: 100%;
      height: 27.8%;
      background-color: black;
      video {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
    section {
      height: 77.2%;
      width: 100%;
      padding-bottom: 30%;
      box-sizing: border-box;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }

      .text {
        width: 95%;
        margin: 0 auto;
        .title {
          width: 100%;
          margin-top: 40px;
          h3 {
            margin: 0;
            text-align: center;
            font-size: 17px;
          }
        }
        .time {
          margin-top: 15px;
          width: 100%;
          text-align: center;
          span {
            font-size: 12px;
          }
        }
        .content {
          margin-top: 30px;
          p {
            margin: 0;
            text-align: left;
            font-size: 14px;
            letter-spacing: 1px;
          }
        }
      }
      .link {
        width: 95%;
        margin: 30px auto 0;
        text-align: center;
        .to_detail {
          font-size: 14px;
          font-weight: bold;
          color: rgb(81, 188, 230);
          letter-spacing: 1px;
        }
      }
      .write {
        width: 95%;
        height: 12.8%;
        margin: 10px auto 0;
        // background-color: red;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(238, 238, 238);
        box-sizing: border-box;
        .left {
          height: 80%;
          width: 14.5%;
          img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        .center {
          margin-left: 5px;
          width: 70%;
          height: 80%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          h4 {
            margin: 0;
            font-size: 14px;
          }
          p {
            margin: 0;
            font-size: 13px;
          }
        }
        .right {
          height: 80%;
          width: 15%;
          display: flex;
          justify-content: end;
          align-items: center;
          img {
            height: 20px;
            width: 20px;
            vertical-align: middle;
          }
        }
      }
      .bottom {
        margin: 30px auto;
        width: 95%;
        ul {
          width: 100%;
          margin: 0;
          padding: 0;
          list-style: none;
          border-bottom: 1px solid rgb(238, 238, 238);
          li {
            width: 100%;
            margin-bottom: 20px;
            .title {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left {
                font-size: 16px;
              }
              .right {
                font-size: 14px;
                color: #777777;
              }
            }
            .video_list {
              width: 100%;
              margin-top: 10px;
              overflow: scroll;
              &::-webkit-scrollbar {
                display: none;
              }
              ol {
                width: 220%;
                margin: 0;
                padding: 0;
                list-style: none;
                display: flex;
                justify-content: space-around;
                li {
                  width: 18%;
                  margin-right: 9px;
                  position: relative;
                  img {
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                  }
                  .time,
                  .text {
                    display: block;
                    width: 80%;
                    height: 17px;
                    font-size: 15px;
                    position: absolute;
                    color: white;
                  }
                  .time {
                    left: 10px;
                    bottom: 25px;
                  }
                  .text {
                    left: 10px;
                    bottom: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                  }
                }
              }
            }
          }
        }
      }
      .pl_list {
        width: 95%;
        margin: 0 auto;
        .title {
          width: 100%;
          span {
            font-size: 14px;
          }
        }
        .pl {
          width: 100%;
          ul {
            width: 100%;
            list-style: none;
            margin: 0;
            padding: 0;
            li {
              width: 100%;
              // background-color: red;
              padding: 20px 0;
              box-sizing: border-box;
              border-bottom: 1px solid rgb(238, 238, 238);
              .pl_box,.pl_box2 {
                width: 100%;
                display: flex;
                .pl_left {
                  width: 10%;
                  // background-color: pink;
                  img {
                    height: 35px;
                    width: 35px;
                    border-radius: 50%;
                  }
                }
                .pl_right {
                  width: 90%;
                  margin-left: 10px;
                  .pl_top {
                    width: 100%;
                    height: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #8a8a8a;
                    p {
                      font-size: 13px;
                    }
                    .good_num {
                      font-size: 13px;
                      margin-right: 10px;
                      img {
                        height: 15px;
                        width: 15px;
                        vertical-align: middle;
                        margin-right: 5px;
                      }
                    }
                  }
                  .pl_bottom {
                    .huifu {
                      display: flex;
                      margin-top: 10px;
                      span {
                        display: block;

                        font-size: 14px;
                      }
                    }
                    h4 {
                      margin-top: 10px;
                      font-size: 14px;
                    }
                    ol {
                      list-style: none;
                      margin: 0;
                      padding: 0;
                      li{

                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .input {
      position: fixed;
      bottom: -3px;
      height: 50px;
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
            color: #b6b6b6;
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
        bottom: 0;
        width: 100%;
        height: 24%;
        background-color: white;
      }
    }
  }
}
</style>