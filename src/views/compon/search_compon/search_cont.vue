<template>
  <div id="search_cont">
    <div class="Tips" v-show="msg == 'ok' ? false : true">未找到相关结果</div>
    <section v-show="msg == 'ok' ? true : false">
      <div class="num">{{ obj.total }}个相关影片</div>
      <div class="list">
        <ul>
          <li
            @click="to_detail(item.postid)"
            v-for="item in img_arr"
            :key="item.postid"
          >
            <div class="zzc"></div>
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
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tj_1: "",
      img_arr: [],
      msg: "",
      obj: {},
      histroy_arr: [],
      str: "",
    };
  },
  methods: {
    getlist(str) {
      let that = this;
      // console.log(str);
      // let str = this.tj_1;
      //   let url = `https://apis.netstart.cn/vmovier/search?kw=${str}&p=1`;
      let url = `https://apis.netstart.cn/vmovier/search?kw=${str}`;
      //   let url = `https://apis.netstart.cn/vmovier/search?kw=青春&p=1`;
      let pro = axios.get(url);
      pro.then(
        (res) => {
          // console.log(res.data);
          that.msg = res.data.msg;
          if (that.msg == "ok") {
            that.obj = res.data.data.result;
            that.img_arr = res.data.data.result.list;
          }
          // that.img_arr = res.data.data.
          //   console.log(res.data);
        },
        (err) => {}
      );
    },
    to_detail(id) {
      console.log(id);
      this.$router.push({ path: "/ordinary", query: { id } });
    },
    get_histroy() {
      this.str = localStorage.getItem("list");
      if(this.str!=null) {
         this.histroy_arr = this.str.split(",");
        this.histroy_arr.shift("");
      }
    },
  },
  props: ["tj"],
  watch: {
    // tj: {
    //   immediate: true,
    //   handler: function () {
    //     this.tj_1 = this.tj;
    //     // console.log(this.tj);
    //     this.getlist(this.tj_1);
    //     this.histroy_arr.unshift(this.tj_1);
    //     // console.log(this.histroy_arr);
    //     let set = new Set(this.histroy_arr);
    //     let new_arr = [...set];
    //     // console.log(new_arr);
    //     let str = "";
    //     new_arr.forEach((item) => {
    //       str += "," + item;
    //     });
    //     console.log(str);
    //     localStorage.setItem("list", str);
    //   },
    // },
    tj(){
      this.tj_1 = this.tj;
        // console.log(this.tj);
        this.getlist(this.tj_1);
        this.histroy_arr.unshift(this.tj_1);
        // console.log(this.histroy_arr);
        let set = new Set(this.histroy_arr);
        let new_arr = [...set];
        // console.log(new_arr);
        let str = "";
        new_arr.forEach((item) => {
          str += "," + item;
        });
        console.log(str);
        localStorage.setItem("list", str);
    }
    
  },
  created() {
    // console.log(this.tj);
    this.get_histroy();
  },
};
</script>
<style lang="scss" scoped>
#search_cont {
  color: white;
  height: 100%;
  width: 100%;
  .Tips {
    width: 100%;
    height: 90px;
    font-size: 12px;
    line-height: 90px;
    text-align: center;
  }
  section {
    height: 100%;
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .num {
      width: 90%;
      height: 36px;
      line-height: 36px;
      margin: 0 auto;
      font-size: 14px;
      color: rgb(173, 173, 173);
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
          color: #fff;
          .zzc {
            position: absolute;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.1);
          }
          img {
            width: 100%;
            vertical-align: middle;
          }
          .text {
            position: absolute;
            bottom: 15px;
            left: 15px;
            z-index: 999;
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
}
</style>