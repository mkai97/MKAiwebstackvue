<template>
  <template v-for="item in menuList" :key="item.id">
    <!-- 子菜单组 -->
    <el-menu-item-group v-if="item.groupName && item.children">
      <template #title>
        <el-icon><component :is="item.icon"></component> </el-icon
        ><span>{{ item.groupName }}</span>
      </template>

      <submenu :item="item.children"></submenu>
    </el-menu-item-group>
    <!-- 子菜单 -->
    <el-sub-menu v-if="item.children" :index="item.id">
      <template #title>
        <el-icon><component :is="item.icon"></component> </el-icon>
        <span>{{ item.name }}</span>
      </template>

      <!-- <slot :item="item.children"></slot> -->
      <submenu :item="item.children"></submenu>
    </el-sub-menu>

    <template v-else>
      <el-menu-item :index="item.id">
        <template #title>
          <el-icon><component :is="item.icon"></component> </el-icon>
          {{ item.name }}
        </template>
      </el-menu-item>
    </template>
  </template>
</template>
  
  <script setup>
import submenu from "./submenu.vue";
const props = defineProps(["item"]);
const { item } = props;
const menuList = item;
console.log(item);
</script>
  
  <style>
.el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}
</style>