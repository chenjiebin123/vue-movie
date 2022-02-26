<template>
  <div id="hot" v-if="isShow">
    <div class="title">
      <div class="text">热门</div>
      <a href="#" @click="to_cate">more</a>
    </div>

    <div class="list">
      <ul>
        <li 
        v-for="item in hot_list" 
        :key="item.postid"
        @click="to_detail(item.postid)"
        >
            <img :src="item.image" alt="" />

            <div class="text">
              <div class="catename">
                <span class="cname">{{ item.cates[0].catename }}</span>
                <span class="fuhao">/</span>
                <span class="time">{{Math.floor(item.duration/60) >9 ? Math.floor(item.duration/60) : '0'+Math.floor(item.duration/60)}}′{{item.duration%60 > 10 ?item.duration%60:'0'+item.duration%60}}″</span>
              </div>
              <h3>{{ item.title }}</h3>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hot_list: [],
      isShow:false
    };
  },
  methods:{
    to_cate(){
      this.$router.push({path:"/classify_hot"})
    },
    to_detail(id) {
      // console.log(id);
      this.$router.push({path:"/ordinary",query:{id}})
    },
  },
  created() {
    let that = this;
    let url = `https://apis.netstart.cn/vmovier/index`;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        if(res.status == "200"){
              // console.log("yes");
              that.hot_list = res.data.data.hot.list;
              setTimeout(() => {
                  that.isShow = true
              }, 1000);
          }
          else {
              // console.log("no");
          }

        
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#hot {
  width: 100%;
  .title {
    width: 100%;
    overflow: hidden;
    position: relative;
    .text {
      width: 100%;
      height: 50px;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      background-color: black;
    }
    a {
      position: absolute;
      top: 50%;
      margin-top: -10px;
      right: 10px;
      -webkit-tap-highlight-color: transparent;
      text-decoration: none;
      color: #c3c3c3;
      display: block;
      font-size: 14px;
    }
  }

  .list {
    width: 100%;
    background-color: skyblue;
    ul {
        width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap:wrap;
      li {
        //   display: none;
          position: relative;
        width: 50%;
          img {
            width: 100%;
            vertical-align: middle;
          }
          .text {
            position: absolute;
            bottom: 15px;
            padding-left: 15px;
            box-sizing: border-box;
            width: 100%;
            .catename {
              display: flex;
              span {
                font-size: 12px;
              display: block;
              margin-bottom: 5px;
              line-height: 12px;
            }
            .fuhao {
              margin: 0 4px;

            }
            }
            h3 {
              margin: 0;
              padding: 0;
              font-size: 13px;
              width: 80%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        
      }
      li:nth-child(1) {
        position: relative;
        width: 100%;
        a {
          -webkit-tap-highlight-color: transparent;
          text-decoration: none;
          color: #fff;
          display: block;
          img {
            height: 211px;
            width: 100%;
            vertical-align: middle;
          }
          .text {
            position: absolute;
            bottom: 15px;
            padding-left: 15px;
            box-sizing: border-box;
            width: 100%;
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
              margin: 0;
              padding: 0;
              width: 80%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>