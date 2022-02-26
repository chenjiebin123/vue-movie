<template>
  <div id="loading">
      <div><img src="@/assets/loading.png" alt="">
        <span>加载中...</span>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
#loading {
  background-color: #fff;
  height: 100%;
  width: 100%;
  overflow: hidden;
  div {
      height: 100%;
      width: 100%;
      display: flex;
      // justify-content: center;
      position: fixed;
      top: 50%;
      align-items: center;
      flex-direction: column;
      img {
          animation-name: loading;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
      }
      span {
          margin-top: 20px;
          font-size: 20px;
          color: rgb(112,112,112);
      }
      @keyframes loading {
          0% {
              transform: rotate(0deg);
          }
          
          100% {
              transform: rotate(360deg);
          }
      }
  }
}
</style>