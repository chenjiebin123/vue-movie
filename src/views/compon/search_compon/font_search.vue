<template>
  <div id="font_search">
    <div class="hot_search">
      <div class="title"><span>热门搜索</span></div>
      <div class="list">
        <ul>
          <li v-for="item in hot_font_list" :key="item.id">
            <div class="cont" @click="font_detail(item.kw, flag)">
              {{ item.kw }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="histroy_search">
      <div class="title" v-show="history_flag">
        <span>搜索历史</span>
        <div @click="clear_history">
          清除
          <img src="@/assets/delHistroy.png" alt="" />
        </div>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <div class="cont" @click="font_detail(item, flag)">{{ item }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tc" v-show="tc_flag">
      <div class="box">
        <div class="title">清空搜索记录?</div>
        <div class="btn">
          <button @click="clear_no">取消</button>
          <button @click="clear_yes">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hot_font_list: [],
      flag: true,
      str: "",
      list: [],
      tc_flag: false,
      history_flag: false,
    };
  },
  methods: {
    font_detail(str, flag) {
      console.log(str,flag);
      this.$emit("aaa", { str, flag });
      // this.flag = false;

      //   console.log(str);
      // this.$router.push({path:"/search",query:{str}})
    },
    hot_search() {
      let that = this;
      let url = `https://apis.netstart.cn/vmovier/search`;
      let pro = axios.get(url);
      pro.then(
        (res) => {
          that.hot_font_list = res.data.data.recommend_keywords;
        },
        (err) => {}
      );
    },
    get_histroyList() {
      this.str = localStorage.getItem("list");
      if (this.str != null) {
        this.list = this.str.split(",");
        this.list.shift("");
        this.history_flag = true;
      } else {
        this.history_flag = false;
      }
    },
    clear_history() {
      this.tc_flag = true;
    },
    clear_yes() {
      localStorage.clear();
      this.list = []
      this.tc_flag = false;
      this.history_flag = false;
      this.get_histroyList();
    },
    clear_no() {
      this.tc_flag = false;
    },
  },
  created() {
    this.hot_search();
    this.get_histroyList();
  },
};
</script>
<style lang="scss" scoped>
#font_search {
  width: 100%;
  height: 100%;
  margin-top: 40px;
  position: relative;
  .hot_search,
  .histroy_search {
    width: 92%;
    margin: 0 auto;
    // overflow: scroll;
    .title {
      width: 100%;
      height: 30px;
      // background-color: blue;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span,
      div {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #999999;
      }
      div {
        display: flex;
        align-items: center;
        img {
          margin-left: 4px;
          height: 15px;
          width: 15px;
          vertical-align: middle;
        }
      }
    }
    .list {
      width: 100%;
      ul {
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        li {
          margin: 8px 10px 8px 0;
          .cont {
            height: 14px;
            line-height: 14px;
            font-size: 13px;
            padding: 10px;
            background-color: rgb(36, 36, 36);
            border-radius: 5px;
            color: rgb(224, 224, 224);
            letter-spacing: 1px;
          }
        }
      }
    }
  }
  .tc {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    .box {
      position: absolute;
      height: 12%;
      width: 66%;
      left: 50%;
      top: 50%;
      margin-top: -6%;
      margin-left: -33%;
      border-radius: 10px;
      background-color: rgb(231, 231, 231);
      overflow: hidden;
      .title {
        width: 100%;
        text-align: center;
        height: 55%;
        line-height: 350%;
        border-bottom: 1px solid #aaaaaa;
        box-sizing: border-box;
        font-size: 17px;
      }
      .btn {
        width: 100%;
        height: 45%;

        button {
          border: none;
          font-size: 16px;
          background-color: rgb(231, 231, 231);
          color: rgb(44, 166, 214);
          width: 50%;
          height: 100%;
          &:nth-child(1) {
            border-right: 1px solid #aaaaaa;
          }
          &:active {
            background-color: #dddddd;
          }
        }
      }
    }
  }
}
</style>