<template>
  <div id="cate">
    <loading id="loading" v-if="!isShow"></loading>
    <section v-if="isShow">
      <div class="list">
        <ul>
          <li
          @click="to_detail(item.postid)"
          v-for="item in img_arr" 
          :key="item.postid">
          <div class="zzc"></div>
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
      obj: this.cate_obj,
    };
  },
  methods: {
    to_detail(id) {
      // console.log(id);
      this.$router.push({path:"/ordinary",query:{id}})
    }
  },
  props: ["cate_obj"],
  created() {
    // console.log(this.cate_obj);
    let cateid = this.obj.cate_id;
    // console.log(cateid);
    let url = `https://apis.netstart.cn/vmovier/cate/getPostInCate?p=1&size=10&cateid=${cateid}`;
    let that = this;
    let pro = axios.get(url);
    pro.then(
      (res) => {
        // console.log(res.data.data);
        if (res.status == "200") {
          //   console.log("yes");
          that.img_arr = res.data.data;
          setTimeout(() => {
            that.isShow = true;
          }, 500);
        } else {
          console.log("no");
        }
      },
      (err) => {}
    );
  },
};
</script>
<style lang="scss" scoped>
#cate {
  width: 100%;
  height: 100%;
  overflow: scroll;
  #loading {
    height: 95%;
    position: absolute;
  }
  section {
    height: 100%;
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
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
        .zzc {
            position: absolute;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0,.1);
        }
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