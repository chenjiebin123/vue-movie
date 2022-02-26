<template>
  <div id="today" v-if="isShow">
    <div class="title">今日</div>
    <div class="list">
      <ul>
        <li 
        v-for="item in today_list" 
        :key="item.postid"
        @click="to_detail(item.postid)"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      today_list: [],
      isShow: false,
    };
  },
  methods:{
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
        if (res.status == "200") {
          // console.log("yes");
          that.today_list = res.data.data.today.list;
          setTimeout(() => {
            that.isShow = true;
          }, 1000);
        } else {
          // console.log("no");
        }
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#today {
  width: 100%;
  .title {
    width: 100%;
    height: 50px;
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    background-color: black;
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
</style>