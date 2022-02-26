<template>
  <div id="my">
    <div class="img">
      <img
        src="https://img1.baidu.com/it/u=2645056634,49589596&fm=26&fmt=auto"
        alt=""
      />
      <div class="user_img">
        <img src="@/assets/user_tx.png" alt="" />
      </div>
      <div class="name">Cola</div>
    </div>
    <div class="list">
      <ul>
        <li>
          <div class="left">
            <img src="@/assets/like.png" alt="" />
            <span>我的喜欢</span>
          </div>
          <div class="right">
            <img src="@/assets/to.png" alt="" />
          </div>
        </li>
        <li>
          <div class="left">
            <img src="@/assets/xiazai.png" alt="" />
            <span>离线缓存</span>
          </div>
          <div class="right">
            <img src="@/assets/to.png" alt="" />
          </div>
        </li>
        <li>
          <div class="left">
            <img src="@/assets/lishijilu.png" alt="" />
            <span>播放历史</span>
          </div>
          <div class="right">
            <img src="@/assets/to.png" alt="" />
          </div>
        </li>
        <li>
          <div class="left">
            <img src="@/assets/xiaoxi.png" alt="" />
            <span>我的消息</span>
          </div>
          <div class="right">
            <img src="@/assets/to.png" alt="" />
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="left">
            <img src="@/assets/setting.png" alt="" />
            <span>设置</span>
          </div>
          <div class="right">
            <img src="@/assets/to.png" alt="" />
          </div>
        </li>
        <li>
          <div class="left">
            <img src="@/assets/fankui.png" alt="" />
            <span>问题反馈</span>
          </div>
          <div class="right">
            <img src="@/assets/to.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>
<style lang="scss" scoped>
#my {
  width: 100%;
  height: 100%;
  .img {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    .user_img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      background-color: rgb(173, 173, 173);
      position: absolute;
      left: 50%;
      top: 25%;
      margin-left: -35px;
      margin-top: -15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      display: block;
      width: 70px;
      height: 30px;
      font-size: 20px;
      position: absolute;
      text-align: center;
      left: 50%;
      top: 50%;
      margin-left: -35px;
    }
  }
  .list {
    width: 100%;
    ul {
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      margin-bottom: 30px;
      border-top: 1px solid #686868;
      border-bottom: 1px solid #686868;
      box-sizing: border-box;
      li {
        width: 100%;
        height: 40px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #252525;
        border-bottom: 1px solid #686868;
        box-sizing: border-box;
        &:last-child{
            border: 0;
        }
        .left {
          width: 90%;
          margin-left: 20px;

          img {
            height: 20px;
            width: 20px;
            vertical-align: middle;
            margin-right: 10px;
          }
          span {
            font-size: 16px;
          }
        }
        .right {
          width: 10%;
          img {
            height: 20px;
            width: 20px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>