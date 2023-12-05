<template>
  <div v-if="show" class="modal">
    <div class="modal-overlay" @click="closeModal"></div>
    <div
      :style="{
        width:$props.width,
        height:$props.height,
        backgroundColor: 'rgba(255, 255,  255,' + $props.opacity + ')',
      }"
      class="modal-content"
    >
      <span class="close-icon" @click="closeModal">X</span>
      <!-- 弹窗内容 -->
      <slot></slot>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue'


</script>
  
  <style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.modal-content {
  position: relative;
  z-index: 1;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}
</style>
  