<template>
    <transition name="share_box">
      <div class="share_list" v-if="flag_share" >
        <header class="header"><span>分享</span></header>
        <section class="section">
          <ul class="share_ul">
            <li class="share_li" v-for="(item, index) in share_arr" :key="index">
              <img :src="require(`@/assets/${item}.png`)" alt="" />
            </li>
          </ul>
        </section>
        <footer class="footer">
          <img @click="close" src="@/assets/close.png" alt=""  />
          <!-- v-if="flag_share" -->
        </footer>
      </div>
    </transition>
</template>
<script>
export default {
  data() {
    return {
      flag_share: false,
      share_arr: ["wechat", "friend", "qq", "qqkj", "weibo"],
    };
  },
  methods: {
    close() {
        // this.isVisible = false;
        this.flag_share = false;
        // console.log(this.share_con);
        // let a =this.flag_share;
        // console.log(this.flag_share);

        this.$emit("share_click", this.flag_share)
    },
  },
  watch:{
      isVisible(val){
          // console.log(val);
          this.flag_share = val
        //   console.log(this.share_con);
      }
  },
  props:['isVisible'],
  created() {
    //   let time = setTimeout(() => {
    //       this.flag_share = true
    //   }, 500);
  },
};
</script>
<style lang="scss" scoped>
  .share_box-enter{
      transform: translateY(200px);
  }
  .share_box-enter-active{
      transition: .5s;
  }
  .share_box-enter-to{
      transform: translateY(0);
  }
  .share_box-leave{
      transform: translateY(0);
  }
  .share_box-leave-active{
      transition: .5s;
  }
  .share_box-leave-to{
      transform: translateY(200px);
  }
  .share_list {
    width: 100%;
    height: 24%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    .header {
      width: 50%;
      height: 30%;
      margin: 0 auto;
      // background-color: red;
      border-bottom: 1px solid #c3c3c3;
      position: relative;
      span {
        width: 40%;
        height: 40%;
        text-align: center;
        line-height: 40%;
        background-color: white;
        display: block;
        position: absolute;
        bottom: -40%;
        left: 50%;
        margin-left: -20%;
        font-size: 14px;
      }
    }
    .section {
      margin-top: 10%;
      width: 100%;
      height: 25%;
      // background-color:red;
      .share_ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        .share_li {
          img {
            height: 25px;
            width: 25px;
          }
        }
      }
    }
    .footer {
      width: 100%;
      img {
        margin: 0 auto;
        display: block;
        height: 4%;
        width: 6%;
      }
    }
  }
</style>