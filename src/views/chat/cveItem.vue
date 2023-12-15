<template>
  <div :id="cve.msg_id" :class="cve.isSelf?'self':'other'">
    <div class="cveItem" v-html="cve.content">
     
    </div>
  </div>
</template>

<script setup>
const item = defineProps(['item']);
const cve = item.item
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
  border-radius:14px;
  color: #333;
}
.self .cveItem {
 border-radius: 14px   14px 0% 14px;
}

.other .cveItem {
 border-radius: 14px 14px 14px 0%;
 background-color: #ccc;
}

.cveItem:hover {
  box-shadow: inset 1px 1px 4px #ffffff;
}
</style>