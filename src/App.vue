<script setup>
import { ElConfigProvider } from "element-plus";
import "element-plus/dist/index.css";
import home from "./views/home/home.vue";

import genID from "@/utils/genID";

const size = "default";
const zIndex = 2000;

genID();
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex">
  <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
@import url("./style.css");

 
</style>
