<template>
<!--  <div id="ebg"></div>-->

  <div class="common-layout">
    <el-container>
      <!--左侧栏 start -->
      <el-aside width="auto">
        <AsideMenu/>
      </el-aside>
      <!--左侧栏 end-->

      <!--右侧内容 start-->
      <el-container>
        <!--顶部导航栏 start-->
        <el-header>
          <TopBar/>
        </el-header>
        <!--顶部导航栏 end-->

        <!--主要内容 start-->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!--主要内容 end-->

      </el-container>
      <!--右侧内容 end-->

    </el-container>
  </div>
</template>

<script setup lang="ts">
//引入左侧栏
import AsideMenu from "@/views/system/layout/aside/Index.vue";
import TopBar from "@/views/system/layout/header/TopBar.vue";
</script>

<style scoped>
/*顶部导航栏样式*/
.el-header {
  --el-header-padding: 0px;
  --el-header-height: auto;
  height: 80px;
  background: #F3F3F3;
}

.el-container {
  height: 100%;
}

.common-layout {
  width: 99vw;
  height: 98vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  overflow: hidden;
}

/* 背景图片样式*/
#ebg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  background-image: url("@/assets/system-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;

}
</style>