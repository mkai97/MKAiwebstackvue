<template>
  <div :id="cve.msg_id" :class="cve.isSelf ? 'self' : 'other'">
    <div class="cveItem">
      <div v-html="cve.content"></div>
      <el-button
        v-if="cve.docs && cve.docs.length > 0"
        @click="showDoc"
        type="primary"
        plain
        class="docBtn"
        >匹配知识库结果</el-button
      >
    </div>
  </div>
  <el-dialog
    v-model="docModalVisible"
    title="匹配知识库结果"
    width="70%"
    :before-close="handleClose"
    @close="handleClose"
  >
    <markdownText v-for="item in docs" :key="item" :docs="item"></markdownText>
  </el-dialog>
</template>

<script setup>
import markdownText from "@/components/markdownText/markdownText.vue";
import { defineProps, ref } from "vue";
const docs = ref([]);
const item = defineProps(["item"]);
const cve = item.item;
const docModalVisible = ref(false);
function showDoc() {
  docs.value = cve.docs;
  docModalVisible.value = true;
}
function handleClose() {
  docModalVisible.value = false;
}
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
.docBtn {
  margin: 10px;
}
</style>