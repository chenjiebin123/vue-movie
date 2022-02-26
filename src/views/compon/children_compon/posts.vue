<template>
  <div id="posts" v-show="isShow" ref="post_s">
    <ol>
      <li v-for="item1 in all_list" :key="item1.title">
        <div class="title">{{ item1.title }}</div>
        <div class="list">
          <ul>
            <li
              v-for="item in item1.list"
              :key="item.postid"
              @click="to_detail(item.postid)"
            >
              <img :src="item.image" alt="" />

              <div class="text">
                <div class="catename">
                  <span class="cname">{{ item.cates[0].catename }}</span>
                  <span class="fuhao">/</span>
                  <span class="time"
                    >{{
                      Math.floor(item.duration / 60) > 9
                        ? Math.floor(item.duration / 60)
                        : "0" + Math.floor(item.duration / 60)
                    }}′{{ item.duration % 60 }}″</span
                  >
                </div>
                <h3>{{ item.title }}</h3>
              </div>
            </li>
          </ul>
        </div>
      </li>
      <div class="icon">
        <img src="@/assets/loading.png" v-show="icon_flag" alt="">
        <span>加载中...</span>
      </div>
    </ol>
  </div>
</template>
<script>
export default {
  //   props: {
  //     t_list: { type: Array },
  //   },
  data() {
    return {
      all_list: [],
      posts_list: [],
      posts_date: "",
      isShow: false,
      wh: 0,
      list_h: 0,
      list_id: "",
      list_flag: true,
      icon_flag:true,
    };
  },
  methods: {
    to_detail(id) {
      // console.log(id);
      this.$router.push({ path: "/ordinary", query: { id } });
    },
  },
  mounted() {},
  props: ["flag"],
  watch: {
    flag: {
      handler: function () {
        // console.log(this.flag);
        this.list_flag = this.flag;
        // console.log(this.list_id);
        if (this.list_flag == true) {
          this.list_flag = false;
          // console.log(this.list_flag);
          this.$emit("flag", this.list_flag);
          let that = this;
          let url = `https://apis.netstart.cn/vmovier/index/getIndexPosts?lastid=${this.list_id}`;
          let pro = axios.get(url);
          pro.then(
            (res) => {
              if (res.status == "200") {
                that.posts_list = res.data.data.list;
                that.posts_date = res.data.data.selection_title;
                that.list_id = res.data.data.lastid;
                that.all_list.push({
                  title: that.posts_date,
                  list: that.posts_list,
                });
                setTimeout(() => {
                  that.isShow = true;
                }, 500);
              } else {
                // console.log("no");
              }
            },
            (err) => {}
          );
        }
        // console.log(this.all_list);
      },
    },
  },
  created() {
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/index`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        if (res.status == "200") {
          // console.log("yes");

          // console.log(res.data.data.posts);
          that.posts_list = res.data.data.posts.list;
          that.posts_date = res.data.data.posts.selection_title;
          that.list_id = res.data.data.posts.lastid;
          that.all_list.push({
            title: that.posts_date,
            list: that.posts_list,
          });
          setTimeout(() => {
            that.isShow = true;
            3;
          }, 500);
        } else {
          // console.log("no");
        }
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#posts {
  width: 100%;
  overflow: scroll;
  ol{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .icon {
    height: 40px;
    display: flex;
    justify-content: center;
      align-items: center;
    img {
      height: 30px;
      width: 30px;
      vertical-align: middle;
      margin-right: 10px;
       animation-name: loading;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
    }
    @keyframes loading {
          0% {
              transform: rotate(0deg);
          }
          
          100% {
              transform: rotate(360deg);
          }
      }
    span {
      color: rgb(112,112,112);
    }
  }
  .title {
    width: 100%;
    height: 50px;
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    background-color: black;
  }
  .list {
    width: 100%;
    background-color: skyblue;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        position: relative;
        img {
          width: 100%;
          vertical-align: middle;
        }
        .text {
          position: absolute;
          bottom: 15px;
          left: 15px;
          .catename {
            display: flex;
            span {
              font-size: 14px;
              display: block;
              margin-bottom: 5px;
              line-height: 14px;
            }
            .fuhao {
              margin: 0 4px;
            }
          }
          h3 {
            font-size: 15px;
            margin: 0;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>