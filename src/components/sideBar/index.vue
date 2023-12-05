<template>
  <div class="sideBar">
    <logoBlock></logoBlock>
    <div>
      <menuVue></menuVue>
    </div>
  </div>
</template>

<script setup>
import logoBlock from "@/components/sideBar/logoBlock.vue";
import menuVue from "@/components/sideBar/menu.vue";
</script>



<style lang="scss" scoped>
.sideBar {
  width: 200px; /* 根据需要调整宽度 */
  flex-shrink: 0; /* 阻止左侧的 .left 元素收缩 */
  height: 100vh; /* 占满视口高度 */
  background-color: rgba(rgba(66, 103, 114, 0.4), 0.4);
  backdrop-filter: blur(6px);
  color: #fff;
  box-sizing: border-box;
  position: relative;
}
</style>

