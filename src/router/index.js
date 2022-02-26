import Vue from 'vue'
import VueRouter from 'vue-router'
import '@/assets/animate/css/animate.min.css'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    redirect:"/find"
  },
  {
    path: '/index',
    name: 'Index', 
    component: () => import('../views/Index.vue'),
    children:[
      {
        path:"/find",
        name:"Find",
        component:()=> import("../views/compon/find.vue")
      },
      {
        path:"/channel",
        name:"Channel",
        component:()=> import("../views/compon/channel.vue")
      },
      {
        path:"/my",
        name:"My",
        component:()=> import("../views/compon/my.vue")
      },
      
    ]
    
  },
  {
    path:"/recommend",
    name:"Recommend",
    component:()=> import("../views/compon/recommend.vue")
  },
  // {
  //   path:"/share",
  //   name:"Share",
  //   component:()=> import("../views/compon/share_compon/share.vue")
  // },
  {
    path:"/search",
    name:"Search",
    component:()=> import("../views/compon/search.vue"),
    redirect:"/search/font_search",
    children:[
      {
        path:"/search/font_search",
        name:"Font_search",
        component:()=> import("../views/compon/search_compon/font_search.vue")
      },
      {
        path:"/search/search_cont",
        name:"Search_cont",
        component:()=> import("../views/compon/search_compon/search_cont.vue")
      }
    ]
  },
  {
    path:"/classify_cate",
    name:"Classify_cate",
    component:()=> import("../views/compon/cate/classify_cate.vue")
  },
  {
    path:"/classify_hot",
    name:"Classify_hot",
    component:()=> import("../views/compon/cate/classify_hot.vue")
  },
  {
    path:"/classify_Series",
    name:"Classify_Series",
    component:()=> import("../views/compon/cate/classify_Series.vue")
  },
  {
    path:"/classify_backstage",
    name:"Classify_backstage",
    component:()=> import("../views/compon/cate/classify_backstage.vue"),
    redirect:"/classify_backstage/all",
    children:[
      {
        path:"/classify_backstage/all",
        name:"All",
        component:()=> import("../views/compon/cate/backstage_children/all.vue")
      },
      {
        path:"/classify_backstage/houqi",
        name:"Houqi",
        component:()=> import("../views/compon/cate/backstage_children/houqi.vue")
      },
      {
        path:"/classify_backstage/movie_kt",
        name:"Movie_kt",
        component:()=> import("../views/compon/cate/backstage_children/movie_kt.vue")
      },
      {
        path:"/classify_backstage/movie_room",
        name:"Movie_room",
        component:()=> import("../views/compon/cate/backstage_children/movie_room.vue")
      },
      {
        path:"/classify_backstage/qicai",
        name:"Qicai",
        component:()=> import("../views/compon/cate/backstage_children/qicai.vue")
      },
      {
        path:"/classify_backstage/shot",
        name:"Shot",
        component:()=> import("../views/compon/cate/backstage_children/shot.vue")
      },
      {
        path:"/classify_backstage/VR",
        name:"VR",
        component:()=> import("../views/compon/cate/backstage_children/VR.vue")
      },
      {
        path:"/classify_backstage/zongsu",
        name:"Zongsu",
        component:()=> import("../views/compon/cate/backstage_children/zongsu.vue")
      },
      
    ]
  },
  {
    path:"/classify_ablum",
    name:"Classify_ablum",
    component:()=> import("../views/compon/cate/classify_ablum.vue")
  },
  {
    path:"/cate",
    name:"Cate",
    component:()=> import("../views/compon/cate_compon/cate.vue")
  },
  {
    path:"/loading",
    name:"Loading",
    component:()=>import("../views/compon/cate_compon/loading.vue")
  },
  {
    path:"/series_detail",
    name:"Series_detail",
    component:()=>import("../views/compon/cate_compon/series_detail.vue")
  },
  {
    path:"/backstage_dateil",
    name:"Backstage_dateil",
    component:()=>import("../views/compon/cate_compon/backstage_dateil.vue")
  },
  {
    path:"/ordinary",
    name:"Ordinary",
    component:()=>import("../views/compon/cate_compon/ordinary.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
