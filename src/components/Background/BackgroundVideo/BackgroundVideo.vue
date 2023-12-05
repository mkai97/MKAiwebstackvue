<template>
  <div class="video-background">
    <video autoplay loop muted :src="videoPath"></video>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const videoPath = ref()

videoPath.value = 'http://qn.mkai97.cn/bgVideo/v-31.mp4'

</script>

<style scoped>
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.video-background video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>