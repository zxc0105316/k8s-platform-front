<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-aside class="aside" :width="asideWidth">


        <el-affix class="aside-affix">

          <div class="aside-logo">
            <el-image class="logo-img" :src="logo"></el-image>
            <span :class="isCollapse?'is-collapse':''">

              <span class="logo-name"> Kubernetes </span>

            </span>

          </div>

        </el-affix>



<!--       这里router定义vue-router模式，菜单栏的index跟路由规则中的path绑定
           default-active 默认激活的菜单栏，这里根据打开的path来找到对应的栏位
 -->
      <el-menu  class="aside-menu"

        router
        :default-active="$router.path"
        :collapse="isCollapse"
        background-color="#131b27"
                text-color="#bfcbd9"
                active-text-color="#20a0ff">

        <!--     routers就是router/index.js中的routes           -->
        <div v-for="menu in routers" :key="menu">
          <!-- 这里第一种情况，路由规则中children只有一个的菜单栏-->
          <el-menu-item class="aside-menu-item" v-if="menu.children && menu.children.length == 1" :index="menu.children[0].path">
          <el-icon><component :is="menu.children[0].icon"></component></el-icon>
            <template #title>

              {{ menu.children[0].name }}
            </template>

          </el-menu-item>
          <!-- 第二种情况，路由规则children大于一个的菜单栏-->
          <el-sub-menu class="el-sub-menu" v-if="menu.children && menu.children.length > 1" :index="menu.path">
              <!--  处理父菜单栏    -->
              <template #title>
                <el-icon><component :is="menu.icon"></component></el-icon>
                <span :class="[isCollapse?'is-collapse':'']"> {{ menu.name }}</span>
              </template>
              <!--  处理子菜单栏  -->
              <el-menu-item class="aside-childitem" v-for="child in menu.children" :key="child" :index="child.path">
                <el-icon><component :is="child.icon"></component></el-icon>
                <template #title>
                  {{ child.name }}
                </template>
              </el-menu-item>
          </el-sub-menu>


        </div>
      </el-menu>


      </el-aside>
      <el-container>
        <el-header class="container-header">

          <el-orw :gutter="20">

          <!--  折叠按钮   -->
            <el-col :span="1">
              <div class="header-collapse" @click="onCollapse">
                <el-icon><component :is="isCollapse?'expand':'fold'"></component></el-icon>
              </div>
            </el-col>
          </el-orw>


        </el-header>
        <el-main>main
          <router-view>

          </router-view>
        </el-main>
        <el-footer>Footer</el-footer>


      </el-container>
    </el-container>
  </div>
</template>


<script>
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "LayoutView",

  setup(){


    const asideWidth = ref("220px")
    const logo = ref(require('@/assets/img/k8s-metrics.png'))
    const isCollapse = ref(false)
    const routers = ref([])

    const onCollapse = function (){
        //  当前状态是展开，点击就收起
        if (this.isCollapse){
          this.asideWidth = '220px'
          this.isCollapse = false
        }else {
        //  当前状态是收起,点击就是展开
          this.asideWidth = '64px'
          this.isCollapse = true
        }
    }

    onBeforeMount(() =>{
      routers.value = useRouter().options.routes
    })
    return{

      asideWidth,
      logo,
      isCollapse,
      routers,
      onCollapse,

      }
    },

}

</script>

<style scoped>
.aside{

  transition: all .5s;
  background-color: #131b27;

}
.logo-img{

  height: 40px;
  width: 40px;
  top:12px;
  padding-left: 12px;

}

.is-collapse {
  display: none;
}

.aside-affix {

  z-index: 1200;
}
.aside-logo {
  color: white;
  height: 60px;

}
.logo-name {

  font-size: 20px;
  font-weight: bold;
  padding: 10px;

}
/*  菜单栏滚轴不显示 */

.aside::-webkit-scrollbar {
  display: none;
}

/* 右边边框宽度 */
.aside-menu {

  border-right-width: 0px;
}

/* 菜单栏背景色*/
.aside-menu-item{

  padding-left: 20px !important;
}

.aside-childitem{

  padding-left: 40px !important;
}
.aside-childitem:hover{
  background-color: #142c4e;

}
.aside-childitem:active {

  background-color: #1f2a3a;
}

.aside-menu-item:hover{
  background-color: #142c4e;
}

.aside-menu-item:active{
  background-color: #1f2a3a;
}

/* header 的css属性 */
.container-header{

  z-index: 1200;
  line-height: 60px;
  font-size: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);

}

.header-collapse{}

</style>
