<template>
  <div id="class_series">
    <loading id="loading" v-if="!isShow"></loading>
    <header>
      <div class="return_channel" @click="return_channel">
        <img src="@/assets/return_-1.png" alt="" />
      </div>
      <div class="title">
        <p>{{ title?title:"自制" }}</p>
      </div>
    </header>
    <section v-if="isShow">
      <ul>
        <li v-for="(item) in arr" :key="item.seriesid" @click="to_series_detail(item.seriesid,item.title)">
          <div class="img">
            <img :src="item.image" alt="" class="big_img" />
          </div>
          <div class="content">
            <div class="title">
              <span>{{item.title}}</span>
            </div>
            <div class="number">
              <span>已更新至{{item.update_to}}集</span>
              <span>{{item.follower_num}}已订阅</span>
            </div>
            <div class="text">
              <p>{{item.content}}</p>
            </div>
          </div>
        </li>
      </ul>
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
      arr: [],
      title: "",
      list_title:""
    };
  },
  methods: {
    return_channel() {
      this.$router.push("/channel");
    },
    to_series_detail(id,list_title){
        this.$router.push({path:"/series_detail",query:{detail_id:id,detail_title:list_title}})
    }
  },
  created() {
    this.title = this.$route.query.cate_name;
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/series/getList?p=1&size=10`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        // console.log(res.data.data);
        if (res.status == "200") {
          that.arr = res.data.data;
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
#class_series {
  width: 100%;
  height: 100%;
  background-color: #fff;
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
    width: 100%;
    height: 95%;
    overflow: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;
        height: 100%;
      li {
          width: 100%;
        .img {
            width: 100%;
          img {
              width: 100%;
              vertical-align: middle;
          }
        }
        .content {
            width: 100%;
            height: 42.3%;
            padding: 2% 4%;
            box-sizing: border-box;
            .title {
                span {
                    display: block;
                    margin: 2px 0;
                    font-size: 20px;
                    letter-spacing: 2px;
                }
            }
            .number {
                width: 60%;
                margin-bottom: 14px;
                 letter-spacing: 1px;
                
                span {
                    font-size: 12px;
                    color: #c3c3c3;
                    margin-right: 8px;
                }
            }
            .text {
                width: 100%;
                margin-bottom: 10%;
                // background-color: blue;
                p {
                    margin: 0;
                    padding: 0;
                    font-size: 15px;
                     overflow : hidden ; 
                     text-overflow : ellipsis ; 
                     display:-webkit-box;
                     -webkit-line-clamp : 2; 
                     -webkit-box-orient : vertical;
                }
            }
        }
      }
    }
  }
}
</style>