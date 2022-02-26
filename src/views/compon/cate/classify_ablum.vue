<template>
  <div id="classify_ablum">
    <loading id="loading" v-show="!isShow"></loading>
    <header>
      <div class="return_channel"  @click="return_channel">
        <img src="@/assets/return_-1.png" alt="" />
      </div>
      <div class="title">
        <p>{{title?title:'专题'}}</p>
      </div>
    </header>
    <section v-if="isShow">
      <div class="list">
        <ul>
          <li
          @click="to_ablum_detail(item.postid)"
          v-for="item in img_arr" 
          :key="item.postid">
            <a href="#">
              <img :src="item.image" alt="" />

              <div class="text">
                <div class="category">{{title}}</div>
                <div class="content">
                  <h3 class="title">
                    {{item.title}}
                  </h3>
                  <p class="fu_title">
                    {{item.app_fu_title}}
                  </p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import loading from "@/views/compon/cate_compon/loading.vue"
export default {
  components:{
        loading
  },
  data() {
    return {
      isShow: false,
      img_arr:[],
      title:""
    };
  },
  methods: {
    return_channel() {
      this.$router.go(-1);
    },
    to_ablum_detail(id){
      this.$router.push({path:"/backstage_dateil",query:{id:id}});
      console.log(id);
    }
  },
  created() {
    this.title =this.$route.query.cate_name;
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/cate/getPostByTab?p=1&size=10&tab=album`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        // console.log(res.data.data);
        if(res.status =="200"){
          that.img_arr = res.data.data
           setTimeout(() => {
                
                that.isShow = true
           }, 2000);
        }
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#classify_ablum {
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
        a {
          -webkit-tap-highlight-color: transparent;
          text-decoration: none;
          color: #fff;
          display: block;
          img {
            width: 100%;
            vertical-align: middle;
          }
          .text {
            position: absolute;
            bottom: 0;
            margin-left: 16px;
            .category {
              width: 50px;
              border-bottom: 1px solid white;
              height: 35px;
              line-height: 35px;
              margin-bottom: 6px;
              font-size: 12px;
            }
            .content {
              overflow: hidden;
              .title{
                margin: 0;
                padding: 0;
                font-size: 15px;
                margin-bottom: 6px;
              }
              .fu_title{
                font-size: 13px;
                margin-bottom: 12px;
                padding: 0;
              }
            }
          }
        }
      }
    }
  }
  }
}
</style>