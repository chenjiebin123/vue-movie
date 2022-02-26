<template>
  <div id="recommend">
    <div class="zzc" v-show="flag_share"></div>
    <img class="image_blurred" :src="obj.image_blurred" alt="" />
    <transition name="cancel">
      <img
        @click="to_find"
        class="image_cancel"
        src="@/assets/cancel.png"
        alt=""
        v-if="flag"
      />
    </transition>
    <transition name="box_content">
      <!-- animate__animated animate__slideInDown -->
      <div class="box" v-if="flag">
        <div class="top">
          <img class="image" :src="obj.image" alt="" />
          <div class="date_box">
            <div class="date">
              <div class="left">
                <span class="day">{{ date }}</span>
              </div>
              <div class="right">
                <span class="month">{{ month }}.</span>
                <span class="week">{{ day }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="content">{{ obj.content }}</div>
          <div class="share">
            <img src="@/assets/redblue.png" alt="" @click="share_cilck" />
          </div>
        </div>
      </div>
    </transition>

    <share
      class="share1"
      @share_click="chilren_flag"
      :isVisible="flag_share"
    ></share>
  </div>
</template>
<script>
import share from "./share_compon/share.vue";
export default {
  components: {
    share,
  },
  data() {
    return {
      obj: {},
      flag: false,
      flag_share: false,
      year: "",
      month: "",
      date: "",
      day: "",
    };
  },
  methods: {
    to_find() {
      this.$router.go(-1);
    },
    share_cilck() {
      this.flag_share = true;
    },
    chilren_flag(date) {
      this.flag_share = date;
    },
    get_date() {
      let date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.date = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      this.day = date.getDay();

      switch (this.day) {
        case 0:
           this.day = "Sunday";
          break;
        case 1:
           this.day = "Monday";
          break;
        case 2:
           this.day = "Tuesday";
          break;
        case 3:
           this.day = "Wednesday";
          break;
        case 4:
           this.day = "Thursday";
          break;
        case 5:
           this.day = "Friday";
          break;
        case 6:
           this.day = "Saturday";
          break;
      }
      switch (this.month) {
        case 1:
           this.month = "Jan.";
          break;
        case 2:
           this.month = "Feb.";
          break;
        case 3:
           this.month = "Mar.";
          break;
        case 4:
           this.month = "Apr.";
          break;
        case 5:
           this.month = "May.";
          break;
        case 6:
           this.month = "Jun.";
          break;
        case 7:
           this.month = "Jul.";
          break;
        case 8:
           this.month = "Aug.";
          break;
        case 9:
           this.month = "Sept.";
          break;
        case 10:
           this.month = "Oct.";
          break;
        case 11:
           this.month = "Nov.";
          break;
        case 12:
           this.month = "Dec.";
          break;
      }
      console.log(this.year, this.month, this.date, this.day);
    },
  },
  created() {
    this.get_date();
    let url = `https://apis.netstart.cn/vmovier/index/getDayCover`;
    var pro = axios.get(url);
    let that = this;
    pro.then(
      (res) => {
        if (res.status == "200") {
          //   console.log("请求成功");
          // console.log(res.data.data);
          that.obj = res.data.data;
          let time = setTimeout(() => {
            this.flag = true;
          }, 300);
          //   console.log(that.obj);
        } else {
          console.log("请求失败");
        }
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#recommend {
  width: 100%;
  height: 100%;
  background-color: black;
  padding-top: 3%;
  box-sizing: border-box;

  .zzc {
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .image_blurred {
    display: block;
    width: 250%;
    position: fixed;
    top: 50%;
    margin-top: -115%;
    margin-left: -75%;
    z-index: 1;
  }
  .box,
  .share,
  .image_cancel {
    position: relative;
    z-index: 6;
  }
  .cancel-enter {
    opacity: 0;
    transform: rotate(45deg);
  }
  .cancel-enter-active {
    transition: 1s 1s;
  }
  .cancel-enter-to {
    opacity: 1;
    transform: rotate(90deg);
  }
  .image_cancel {
    margin-left: 3%;
    display: block;
    height: 15px;
    width: 4%;
  }
  .box {
    height: 60%;
    width: 86%;
    margin: 32% auto;
    border-radius: 2%;
    overflow: hidden;
    .top {
      margin: 0;
      width: 100%;
      background: black;
      height: 77%;
      position: relative;

      .image {
        width: 100%;
        position: absolute;
        z-index: 1;
      }
      .date_box {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        bottom: 0;
        z-index: 2;
        color: #fff;
        .date {
          width: 100%;
          height: 25%;
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          .left {
            height: 40px;
            width: 50px;
            text-align: center;
            line-height: 40px;
            border-right: 1px solid #fff;
            margin-left: 20px;
            .day {
              font-size: 35px;
            }
          }
          .right {
            height: 40px;
            font-size: 14px;
            margin-left: 10px;
            text-align: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .week {
              display: block;
            }
            .month {
              display: block;
            }
          }
        }
      }
    }
    .bottom {
      height: 23%;
      width: 100%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .content {
        text-align: center;
        width: 100%;
        font-size: 14px;
      }
      img {
        margin-top: 100%;
        display: block;
        height: 18px;
        width: 18px;
      }
    }
  }
  .box_content-enter {
    transform: translateY(-1000px);
    opacity: 0.5;
  }
  .box_content-enter-active {
    transition: 1.5s;
  }
  .box_content-enter-to {
    transform: translateY(0);
    opacity: 1;
  }
  .share1 {
    position: fixed;
    z-index: 999;
    bottom: -1px;
    width: 100%;
    height: 24%;
    background-color: white;
  }
}
</style>