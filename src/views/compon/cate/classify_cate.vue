<template>
    <div id="cate">
        <header>
            <div class="return_channel">
                <img @click="return_channel" src="@/assets/return_-1.png" alt="">
            </div>
            <div class="title">
                <p>{{obj.cate_name}}</p>
            </div>
        </header>
        <section>
            <cate :cate_obj="obj"></cate>
        </section>
    </div>
</template>
<script>
import cate from '@/views/compon/cate_compon/cate.vue'
export default {
    components:{
        cate,
        obj:{}
    },
    data() {
        return {}
    },
    methods :{
        return_channel(){
            this.$router.push("/channel")
        }
    },
    created(){
        this.obj = this.$route.query;
        // console.log(this.obj);
    }
}
</script>
<style lang="scss" scoped>
#cate {
    width: 100%;
    height: 100%;
    
    header {
        width: 100%;
        height: 5%;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
       .return_channel{
           img {
               position: absolute;
               left: 10px;
               top: 7px;
               height: 20px;
               width: 20px;
               vertical-align: middle;
           }
       }
       .title {
           p {
            padding: 0;
            margin: 0;
            color: white;
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
    }
}
</style>