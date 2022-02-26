<template>
  <div id="banner" v-if="isShow">
    <ul
      :style="`${
        flag == true ? 'transition:all .5s' : 'transition:none'
      }; transform:translateX(${banner_moves}px)`"
      @transitionend="myEnd"
    >
      <li>
        <a href="#">
          <img :src="arr[arr.length - 1].image" alt="" />
        </a>
      </li>
      <li
        v-for="(item, index) in arr"
        :key="item.bannerid"
        @touchstart="banner_start"
        @touchmove="banner_move"
        @touchend="banner_end"
      >
        <a href="#"
          ><img @touchstart="banner(index)" :src="item.image" alt=""
        /></a>
      </li>
      <li>
        <a href="#">
          <img :src="arr[0].image" alt="" />
        </a>
      </li>
    </ul>
    <ol :style="'margin-left:-' + num * 10 + 'px'">
      <li
        v-for="(item, index) in arr"
        :class="opt1_index == index ? 'active' : ''"
        :key="item.bannerid"
      ></li>
    </ol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      first_banner: "",
      last_banner: "",
      time: null,
      banner_list: [],
      album_list: [],
      arr: [],
      touch_start: 0,
      touch_end: 0,
      banner_moves: -375,
      banner_ends: -375,
      s: 0,
      flag: true,
      banner_index: 1,
      opt1_index: 0,
      opt2_index: 0,
      num: 0,
      isShow: false,
    };
  },
  watch: {
    opt2_index() {
      this.opt1_index = this.opt2_index;
      // console.log(this.opt1_index);
    },
  },
  methods: {
    banner(index) {
      this.banner_index = index + 1;
      //   console.log(this.banner_index);
    },
    banner_start(evt) {
      clearInterval(this.time);
      this.flag = false;
      this.touch_start = evt.changedTouches[0].clientX;
      //   this.touch_end = 0;
    },
    banner_move(evt) {
      this.s = this.touch_end - this.touch_start;
      this.touch_end = evt.changedTouches[0].clientX;
      this.banner_moves = this.touch_end - this.touch_start + this.banner_ends;
    },
    banner_end(evt) {
      this.flag = true;
      if (this.s == 0) {
        this.flag = false;
      } else if (this.s < 0) {
        if (this.s < -375 / 2) {
          this.banner_moves = (this.banner_index + 1) * -375;
          this.opt2_index++;
          this.banner_index++;

          if (this.banner_moves <= (this.arr.length + 1) * -375) {
            this.flag = false;
            this.banner_index = 1;
            this.banner_moves = this.banner_index * -375;
            this.opt2_index = 0;
            // console.log(this.opt2_index);
          } else {
            this.flag = true;
          }
        } else {
          this.banner_moves = this.banner_index * -375;
        }
      } else {
        if (this.s > 375 / 2) {
          this.banner_moves = (this.banner_index - 1) * -375;
          this.opt2_index--;
          this.banner_index--;

          if (this.banner_moves >= 0 * -375) {
            this.flag = false;
            this.banner_index = this.arr.length;
            this.banner_moves = this.banner_index * -375;
            this.opt2_index = this.arr.length - 1;
            // console.log(this.opt2_index);
          } else {
            this.flag = true;
          }
        } else {
          this.banner_moves = this.banner_index * -375;
        }
      }
      this.banner_ends = this.banner_moves;
      this.s = 0;
      //   this.touch_start = this.touch_end;
      this.autoplay();
    },
    myEnd() {
      this.opt1_index = this.opt2_index;

      if (this.banner_index >= this.arr.length + 1) {
        this.banner_index = 1;
        this.flag = false;
        this.banner_moves = -375;
      }
      // console.log(this.banner_index);
    },
    autoplay() {
      this.time = setInterval(() => {
        this.banner_index++;
        this.banner_moves = this.banner_index * -375;
        this.flag = true;
        this.opt2_index++;
        if (this.opt2_index > this.arr.length - 1) {
          this.opt2_index = 0;
        }
      }, 3000);
    },
  },
  props: ["banner_list_name"],
  created() {
    // console.log(this.banner_list_name);

    // console.log(this.banner_list);
    let that = this;

    if (this.banner_list_name == "backstage") {
      let url = `https://apis.netstart.cn/vmovier/index/getBanner?type=9`;
      let pro = axios.get(url);
      pro.then(
        (res) => {
          if (res.status == "200") {
            that.arr = res.data.data;
            that.num = that.arr.length;
            // console.log(that.num);
            setTimeout(() => {
              that.isShow = true;
            }, 100);
          } else {
            console.log("no");
          }
        },
        (err) => {}
      );
    } else {
      let url = `https://apis.netstart.cn/vmovier/index`;
      let pro = axios.get(url);
      pro.then(
        (res) => {
          if (res.status == "200") {
            that.banner_list = res.data.data.banner.list;
            that.album_list = res.data.data.album.list;
            if (that.banner_list_name == "album") {
              that.arr = that.album_list;
              // console.log(that.arr);
            } else {
              that.arr = that.banner_list;
              // console.log(that.arr);
            }
            that.num = this.arr.length;
            // console.log(that.num);
            setTimeout(() => {
              that.isShow = true;
            }, 100);
          } else {
            console.log("no");
          }
        },
        (err) => {}
      );
    }

    clearInterval(this.time);
    this.autoplay();
  },
};
</script>
<style lang="scss" scoped>
#banner {
  width: 100%;
  overflow: hidden;
  position: relative;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 2000%;
    overflow: hidden;

    li {
      width: 5%;
      float: left;
      a {
        display: block;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          vertical-align: middle;
          border: none;
        }
      }
    }
  }
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    bottom: 12px;
    left: 50%;
    li {
      height: 3px;
      width: 12px;
      background-color: rgba(204, 204, 204, 0.5);
      float: left;
      margin-left: 8px;
    }
    li.active {
      // background-color: #ccc;
      background-color: red;
    }
  }
}
</style>