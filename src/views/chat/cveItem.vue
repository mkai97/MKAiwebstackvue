<template>
  <div :id="cve.msg_id" :class="cve.isSelf ? 'self' : 'other'">
    <div class="cveItem">
      <span v-html="cve.content + (!cve.isSelf&&cve.isLoading? loadingBlock:'')"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const item = defineProps(["item"]);
const loadingBlock = ref(`<div style="display: inline-block; width: 6px;
  height: 16px;
  background-color: #333;margin-top:2px;">
     
    </div>`);
const cve = item.item;
</script>

<style scoped>
.self {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.other {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cveItem {
  background-color: #eee;
  width: 80%;
  padding: 12px;
  word-break: break-all;
  margin: 30px;
  border-radius: 14px;
  color: #333;
  display: flex;
  align-items: center;
}
.self .cveItem {
  border-radius: 14px 14px 0% 14px;
}

.other .cveItem {
  border-radius: 14px 14px 14px 0%;
  background-color: #ccc;
}

.cveItem:hover {
  box-shadow: inset 1px 1px 4px #ffffff;
}
</style>