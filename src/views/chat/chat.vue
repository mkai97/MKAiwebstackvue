<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    "
  >
    <div style="width: 800px; height: 800px; background-color: #ffffff">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="聊天" name="first">
          <chatMain :type="'chat'"></chatMain>
        </el-tab-pane>
        <el-tab-pane label="知识库问答" name="second">
          <chatMain :type="'knowledge'"></chatMain>
        </el-tab-pane>
        <el-tab-pane label="知识库文件" name="third">
          <div>33333333</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import chatMain from "./chatMain.vue";
import chatapi from "@/http/api";
import { ref } from "vue";
const activeName = ref("first");
const msgTemplate = {
//   query: "",
//   conversation_id: "",
  history_len: -1,
//   history: [],
  stream: true,
  model_name: "chatglm3-6b",
  temperature: 0.7,
  max_tokens: 0,
  prompt_name: "default",
};
if (localStorage.getItem("msgTemplate") == null) {
  localStorage.setItem("msgTemplate", JSON.stringify(msgTemplate));
}

// 获取可用模型
const LLmodels = ref([]);
chatapi.get_list_running_models().then((res) => {
  console.log(res);
  if (res.code == 200) {
    LLmodels.value = res.data;
    localStorage.setItem("LLmodels", JSON.stringify(res.data));
  }
});

const handleClick = (tab) => {
  console.log(tab);
};
</script>

<style>
</style>