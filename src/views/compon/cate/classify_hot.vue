<template>
  <div id="classify_hot">
    <loading id="loading" v-show="!isShow"></loading>
    <header>
      <div class="return_channel" @click="return_channel">
        <img src="@/assets/return_-1.png" alt="" />
      </div>
      <div class="title">
        <p>{{ title ? title : "热门" }}</p>
      </div>
    </header>
    <section v-show="isShow">
      <div class="list">
        <ul>
          <li
            @click="to_detail(item.postid)"
            v-for="item in img_arr"
            :key="item.postid"
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
    </section>
  </div>
</template>
<script>
import loading from "@/views/compon/cate_compon/loading.vue";
export default {
  components: {
    loading,
  },
  data() {
    return {
      isShow: false,
      img_arr: [],
      title: "",
    };
  },
  methods: {
    return_channel() {
      this.$router.go(-1);
    },
    to_detail(id) {
      // console.log(id);
      this.$router.push({path:"/ordinary",query:{id}})
    },
  },
  created() {
    this.title = this.$route.query.cate_name;
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/cate/getPostByTab?p=1&size=10&tab=hot`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        // console.log(res.data.data);
        if (res.status == "200") {
          that.img_arr = res.data.data;
          setTimeout(() => {
            that.isShow = true;
          }, 2000);
        }
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#classify_hot {
  width: 100%;
  height: 100%;
  #loading {
    position: absolute;
  }
  header {
    width: 99.893%;
    height: 5%;
    background-color: black;
    display: flex;
    align-items: center;
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
  section {
    overflow: scroll;
    height: 95%;
    width: 100%;
     &::-webkit-scrollbar{
      display: none;
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
  
}
</style>