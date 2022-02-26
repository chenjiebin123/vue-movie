<template>
  <div id="list" >
    <loading id="loading" v-if="!isShow"></loading>
    <ul v-if="isShow">
      <li 
      @click="back_list_detail(item.postid)"
      v-for="item in list" :key="item.postid">
        <div class="left">
          <img :src="item.image" alt="" />
        </div>
        <div class="right">
          <div class="text">{{ item.title }}</div>
          <div class="num">
            <div class="share">
              <img src="@/assets/redblue.png" alt="" />
              <span>{{ item.share_num }}</span>
            </div>
            <div class="like">
              <img src="@/assets/like.png" alt="" />
              <span>{{ item.like_num }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
      list: [],
    };
  },
  methods: {
    back_list_detail(id){
      this.$router.push({path:"/backstage_dateil",query:{id:id}})
      // console.log(id);
    }
  },
  
  created() {
    // console.log(this.$route.query);
    let id = this.$route.query.id;
    // console.log(id);
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/backstage/getPostByCate?p=1&size=10&cateid=${id}`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        // console.log(res.data.data);
        if (res.status == "200") {
          that.list = res.data.data;
          setTimeout(() => {
            that.isShow = true;
          }, 500);
        }
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#list {
  background-color: #fff;
  width: 100%;
  ul {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      border-bottom: 1px solid rgb(230, 230, 230);
      .left {
        width: 27%;
        img {
          height: 78px;
          width: 100px;
          vertical-align: middle;
        }
      }
      .right {
        flex-grow: 1;
        margin-left: 18px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .text {
          font-size: 15px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .num {
          display: flex;
          width: 60%;
          justify-content: space-between;
          .share {
            img {
              height: 18px;
              width: 18px;
              vertical-align: middle;
            }
            span {
              margin-left: 5px;
              font-size: 12px;
            }
          }
          .like {
            img {
              height: 18px;
              width: 18px;
              vertical-align: middle;
            }
            span {
              margin-left: 5px;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  #loading {
    position: absolute;
  }
}
</style>