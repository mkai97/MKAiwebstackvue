<template>
  <div class="common-layout">
    <el-container>
      <backgroundVideo />
      <el-aside class="boxShadow asideBar" width="200px">
        <sideBar></sideBar>
      </el-aside>
      <el-container>
        <el-header>
          <searchArea></searchArea>
        </el-header>
        <el-main>
          <customModuleArea></customModuleArea>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import sideBar from "@/components/sideBar/index.vue";
import searchArea from "@/components/searchArea/index.vue";
import customModuleArea from "@/components/customModuleArea/index.vue";
import backgroundVideo from "@/components/Background/backgroundVideo/backgroundVideo.vue";

</script>
<style lang="scss" scoped>
.common-layout{
  position: relative;
}
.layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  height: 100%;
  z-index: 1;
  position: relative;
  opacity: 0.9999;
}
</style>