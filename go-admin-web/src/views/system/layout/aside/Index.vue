<template>
  <el-menu color="white" text-color="#67879b" router
           :default-active="route.path"
           :unique-opened="false" :default-openeds="[route.path]"
           class="el-menu-vertical-demo">
    <!--logo start-->
    <div class="imagBox">
      <img src="@/assets/logo.svg" alt="">
    </div>
    <!--logo end-->

    <!--遍历菜单开始-->
    <template v-for="(v,index) in menuData" :key="index">
      <!--如果菜单有子菜单，则循环子菜单-->
      <el-sub-menu v-if="v.sub_menus.length>0" :index="index">
        <template slot="title">
          <el-icon>
            <component :is="v.web_icon"></component>
          </el-icon>
        </template>

        <el-menu-item v-for="child in v.sub_menus" :key="child.path" :index="child.path">
          <el-icon>
            <component :is="child.web_icon"></component>
            />
          </el-icon>
          {{ child.name }}
        </el-menu-item>
      </el-sub-menu>

      <!--没有子菜单处理-->
      <el-menu-item v-else-if="v.sub_menus.length==0" :key="v.path" :index="v.path">
        <el-icon>
          <component :is="v.web_icon"></component>
        </el-icon>
        <span>{{ v.name }}</span>
      </el-menu-item>
    </template>
    <!--遍历菜单结束-->
  </el-menu>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import {useMenuStore} from "@/store/modules/menu.ts";

const route = useRoute()

const {routers} = useMenuStore()

//获取菜单数据
const menuData = ref()
menuData.value = routers


</script>

<style scoped>
.imagBox {
  width: 100%;
  height: 70px;
}

.imagBox img {
  max-width: 1%;
}

.el-menu {
  height: 100%;
  border: 0px;

}

/*菜单选中颜色变换*/
:deep(.el-menu-item.is-active) {
  color: white;
  background: linear-gradient(to right, #e99d53, #a39a32);
}

</style>