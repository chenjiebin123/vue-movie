<template>
  <div id="classify_backstage">
    <header>
      <div class="return_channel" @click="return_channel">
        <img src="@/assets/return_-1.png" alt="" />
      </div>
      <div class="title">
        <p>{{ title?title:"幕后" }}</p>
      </div>
    </header>
    <nav>
      <ul>
        <li v-for="item in backstage_cate" :key="item.cateid">
          <router-link 
          :to="{ path: `/classify_backstage/${item.name}`,query:{id:item.cateid}}"
          >
          <span>{{ item.catename }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <section v-show="isShow">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      backstage_cate: [],
      name_arr: [
        "all",
        "movie_room",
        "movie_kt",
        "shot",
        "qicai",
        "VR",
        "houqi",
        "zongsu",
      ],
      title: "",
    };
  },
  methods: {
    return_channel() {
      this.$router.push("/channel");
    },
  },
  created() {
    this.title = this.$route.query.cate_name;
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/backstage/getCate`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        if (res.status == "200") {
          that.backstage_cate = res.data.data;
          that.backstage_cate.forEach((item, index) => {
            item.name = that.name_arr[index];
          });
          setTimeout(() => {
            that.isShow = true;
          }, 1000);
        }
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#classify_backstage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  header {
    width: 99.893%;
    height: 5%;
    background-color: black;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
    top: 0;
    // justify-content: center;
    .return_channel {
      height: 100%;
      width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
      img {
        position: absolute;
        height: 20px;
        width: 20px;
        vertical-align: middle;
      }
    }
    .title {
      width: 100%;
      margin-left: -10%;
      p {
        padding: 0;
        margin: 0;
        width: 25%;
        margin: 0 auto;
        color: white;
        text-align: center;
        letter-spacing: 3px;
      }
    }
  }
  nav {
    width: 100%;
    overflow: scroll;
    position: fixed;
    z-index: 99;
    top: 5%;
    background-color: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    > ul {
      width: 170%;
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;

      li {
        height: 41px;
        a {
          text-decoration: none;
          color: black;
          -webkit-tap-highlight-color: transparent;
          height: 40px;
          display: flex;
          align-items: center;
          &.router-link-active {
            border-bottom: 2px solid black;
          }
          span {
            display: block;
            width: 100%;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-right: 1px solid #ccc;
            font-size: 14px;
            padding:0 20px;
          }
        }
      }
    }
  }
  section {
    overflow: scroll;
    position: absolute;
    top: 10%;
    height: 90%;
    width: 100%;
     &::-webkit-scrollbar{
      display: none;
    }
  }
}
</style>