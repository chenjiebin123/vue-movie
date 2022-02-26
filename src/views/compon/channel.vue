<template>
  <div id="channel">
    <loading id="loading" v-if="!isShow"></loading>
    <ul  v-if="isShow">
      <li v-for="item in channel_arr" :key="item.catename">
          <div class="box">
            <img :src="item.icon" alt="" />
            <span class="text" @click="to_detail(item)"
              >#{{ item.catename }}#</span
            >
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
      obj: {},
      channel_arr: [
        {
          tab:'hot',
          catename:'热门',
          cate_type:1,
          icon:'https://cs.xinpianchang.com/uploadfile/tmp/article/2022/01/20/61e90f039cf5f_cut.jpeg@720w_480h_1e_1c'
        },
        {
          tab:'album',
          catename:'专题',
          cate_type:1,
          icon:'	https://cs.xinpianchang.com/uploadfile/tmp/article/2022/01/26/61f10744be4a0_cut.jpeg@720w_480h_1e_1c'
        },
        {
          tab:'Series',
          catename:'自制',
          cate_type:1,
          icon:'https://cs.xinpianchang.com/uploadfile/tmp/article/2022/02/09/620370601092c_cut.jpeg@720w_480h_1e_1c'
        },
        {
          tab:'Originality',
          catename:'创意',
          cateid:6,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef30ce02c7.jpg'
        },
        {
          tab:'Improvement',
          catename:'励志',
          cateid:7,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef678511dd.jpg'
        },
        {
          tab:'Funny',
          catename:'搞笑',
          cateid:8,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef5807352a.jpg'
        },
        {
          tab:'poster',
          catename:'广告',
          cateid:13,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef5148a539.jpg'
        },
        {
          tab:'Car',
          catename:'汽车',
          cateid:92,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Cate/2018-08-30/5b87cdbf9d93e.png'
        },
        {
          tab:'travel',
          catename:'旅行',
          cateid:11,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2018-11-15/5becc5ff3cc14.jpg'
        },
        {
          tab:'love',
          catename:'爱情',
          cateid:12,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef609815e3.jpg'
        },
        {
          tab:'plot',
          catename:'剧情',
          cateid:17,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef63d2134e.jpg'
        },
        {
          tab:'motion',
          catename:'运动',
          cateid:10,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef6549c021.jpg'
        },
        {
          tab:'animation',
          catename:'动画',
          cateid:16,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef668bc201.jpg'
        },
        {
          tab:'music',
          catename:'音乐',
          cateid:18,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef68abf6de.jpg'
        },
        {
          tab:'science',
          catename:'科幻',
          cateid:23,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef6992fd6e.jpg'
        },
        {
          tab:'Notice',
          catename:'预告',
          cateid:43,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef6ac34ce2.jpg'
        },
        {
          tab:'record',
          catename:'记录',
          cateid:24,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef6b89cebb.jpg'
        },
        {
          tab:'Mixed shear',
          catename:'混剪',
          cateid:44,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef6c7b9b25.jpg'
        },
        {
          tab:'game',
          catename:'游戏',
          cateid:104,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2019-11-06/5dc2790039c0b.jpg'
        },
         {
          tab:'fashion',
          catename:'时尚',
          cateid:88,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2018-05-24/5b06632f9eaa3.jpg'
        },
        {
          tab:'experiment',
          catename:'实验',
          cateid:45,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef6d8892c8.jpg'
        },
        {
          tab:'life',
          catename:'生活',
          cateid:78,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Series/2017-07-07/595ef6e89bf37.jpg'
        },
        {
          tab:'delicacy',
          catename:'美食',
          cateid:107,
          cate_type:0,
          icon:'https://cs.vmovier.com/Uploads/Cate/2020-07-21/5f16bcbacccd1.jpg'
        },
        {
          tab:'backstage',
          catename:'幕后',
          cate_type:1,
          icon:'https://cs.xinpianchang.com/uploadfile/tmp/article/2021/12/30/61cdc2001ce11_cut.jpeg@720w_480h_1e_1c'
        }
        
      ],
      isShow: true,
    };
  },
  methods: {
    to_detail(obj) {
      console.log(obj);
      if (obj.cate_type == 0) {
        this.$router.push({path:"/classify_cate",query:{"cate_name":obj.catename,"cate_id":obj.cateid}})
      } else {
        if (obj.tab == "hot") {
          this.$router.push({path:"/classify_hot",query:{"cate_name":obj.catename}})
        } else if (obj.tab == "album") {
          this.$router.push({path:"/classify_ablum",query:{"cate_name":obj.catename}})
        } else if (obj.tab == "Series") {
          this.$router.push({path:"/classify_Series",query:{"cate_name":obj.catename}})
        } else {
          this.$router.push({path:"/classify_backstage",query:{"id":2,"cate_name":obj.catename}})
        }
      }
    },
  },
  // created() {
  //   let url = `https://apis.netstart.cn/vmovier/cate/getList`;
  //   let pro = axios.get(url);
  //   let that = this;
  //   pro.then(
  //     (res) => {
  //       if (res.status == "200") {
  //         // console.log("yes");
  //         // console.log(res.data.data);
  //         that.channel_arr = res.data.data;
  //         setTimeout(() => {
  //           that.isShow = true;
  //         }, 100);
  //       } else {
  //         // console.log("no");
  //       }
  //       // console.log(res.data.data);
  //       // that.channel_arr = res.data.data;
  //       //   console.log(that.channel_arr);
  //     },
  //     (err) => {}
  //   );
  // },
};
</script>
<style lang="scss" scoped>
#channel {
  background-color: rgb(34, 34, 34);
  width: 100%;
  overflow: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
  #loading {
    position: absolute;
    z-index: 100;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      height: 23%;
      background-color: skyblue;
      color: white;
        .box {
          height: 100%;
          width: 100%;
          position: relative;
          img {
            height: 100%;
            width: 100%;
            vertical-align: middle;
          }
          .text {
            position: absolute;
            top: 10px;
            margin-top: -10px;
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 1000%;
            font-size: 20px;
            font-weight: bold;
          }
        }
    }
  }
}
</style>