# my_app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# 微影人生

	项目介绍
	此项目是一个模仿场库app的移动项目，项目的页面分为：推荐页、发现页、分类页、个人页、搜索页
	推荐页：有一个动画效果进场，能看见当前的时间，和一些心灵鸡汤。
	发现页：头部有一个轮播图，接下来是一些今日推荐，热门推荐等几个板块，实现了下拉刷新。
	分类页：展示几十个不同分类的模块，点击进去是对应的文章列表，文章列表点击进去是详情页
	个人页：主要是展示个人的信息，清理缓存等功能。
	搜索页：实现关键字搜索，也能从输入框搜索想要的文章，还有显示搜索的历史记录。
	详情页：显示文章内容，有文字，图片，视频等，下方有评论信息等。
	



	项目结构
	| --pulic
	| --src
		|-- assets // 存放静态资源（小图标等）
		|-- components // 存放小组件
		|-- plugins // 存放插件
		|-- rotuer //存放子路由
		|-- views // 存放页面级别
			|-- compon // 存放组件文件夹
				|-- cate //
				|-- cate_compon // 
				|-- children_compon // 发现页-->小组件
				|-- search_compon // 搜索页-->小组件
				|-- share_compon // 分享组件
				|-- channel // 频道组件
				|-- find // 发现组件
				|-- my // 个人组件
				|-- recommend // 推荐组件
				|-- search //搜索组件
			|-- index.vue //首页组件
		|-- App.vue 
		|-- main.js // 入口文件
	
	
	
	数据接口：
	api文档：https://apis.netstart.cn/vmovier/#/?id=todo
	
	编写思想：
	先构建好整体框架，编写每一个页面的时候，先写好大概布局，
	再将每一个区块逐步完成页面编写和数据渲染，最终将整个页面编写完成，
	最后再与UI设计图进行对比，对页面细节的处理。
	
	
	
	










