<template>
  <el-menu
    default-active="1"
    :style="{
      'border-right': 'none',
      '--bg-color': 'transparent',
      '--el-menu-bg-color': 'transparent',
      '--el-menu-text-color': '#fff',
      '--el-menu-active-bg-color': '#333',
      '--el-menu-active-color': '#333',
      '--el-menu-hover-bg-color': '#ccc',
      '--el-menu-hover-text-color': '#333333',
      '--text-color': '#fff',
    }"
    class=""
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <submenu :item="menuList" >
      <template v-slot="slotProps">
      <submenu  :item="slotProps.item"></submenu>
      </template>
    </submenu>
  </el-menu>
</template>

<script setup>
import submenu from "./submenu.vue";
const menuList = [
  {
    id: 1,
    name: "Home1",
    path: "/home",
    icon: "location",
    children:[
      {
        id: 11,
        name: "Home11",
        path: "/home",
        icon: "location",
      },
      {
        id: 12,
        name: "About12",
        path: "/about",
        icon: "pointer"
      },
    ]
  },
  {
    id: 2,
    name: "About2",
    path: "/about",
    icon: "pointer",
    children:[
      {
        id: 20,
        name: "Home20",
        path: "/home",
        icon: "location",
        groupName: "",
        children:[
          {
            id: 201,
            name: "Home201",
            path: "/home",
            icon: "location",
          },
          {
            id: 202,
            name: "About201",
            path: "/about",
            icon: "pointer"
          },
      ]
      },
      {
        id: 21,
        name: "About21",
        path: "/about",
        icon: "pointer"
      },
      {
        id: 22,
        name: "Contact22",
        path: "/contact",
        icon: "pointer"
      },
    
    ]
  },
  {
    id: 3,
    name: "Contact",
  },
];
</script>

<style>
.el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}
</style>