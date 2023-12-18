<template>
  <div style="padding: 10px">
    <el-button type="primary" @click="addKBModal">添加知识库</el-button>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="添加知识库"
    width="30%"
    :before-close="handleClose"
  >
    <el-form label-width="100px">
      <el-form-item label="知识库名称">
        <el-input
          v-model="knowledgeBaseName"
          placeholder="请输入知识库名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addKB"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
  <script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import chatapi from "@/http/api.js";

const knowledgeBaseName = ref("");
const dialogVisible = ref(false);

const emits = defineEmits(["addKBSuccess"]);

function addKBModal() {
  dialogVisible.value = true;
}
function addKB() {
  chatapi
    .create_knowledge_base({
      knowledge_base_name: knowledgeBaseName.value,
    })
    .then((res) => {
      res.kbname = knowledgeBaseName.value;
      emits("addKBSuccess", res);
      knowledgeBaseName.value = "";
      dialogVisible.value = false;
    })
    .catch((err) => {});
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定取消添加知识库吗？")
    .then(() => {
      knowledgeBaseName.value = "";
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
  <style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
  