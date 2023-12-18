<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      overflow: auto;
    "
  >
    <div style="width: 800px; height: 800px; background-color: #ffffff">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="聊天" name="first">
          <chatMain :type="'chat'"></chatMain>
        </el-tab-pane>
        <el-tab-pane label="知识库问答" name="second">
          <chatMainKB :type="'knowledge'"></chatMainKB>
        </el-tab-pane>
        <el-tab-pane label="知识库" name="third">
          <KBconfig></KBconfig>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import chatMain from "./chatMain.vue";
import chatMainKB from "@/views/chat/KBchat/chatMainKB.vue";
import KBconfig from "@/views/chat/KBconfig/KBconfig.vue";
import chatapi from "@/http/api";
import { ref } from "vue";
const activeName = ref("first");
const msgTemplate = {
  // llm聊天的模版
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
const msgTemplateKB = {
  // 知识库问答的模版
  // query: "你好",
  knowledge_base_name: "samples",
  top_k: 3,
  score_threshold: 1,
  // history: [ ],
  stream: true,
  model_name: "chatglm3-6b",
  temperature: 0.7,
  max_tokens: 0,
  prompt_name: "default",
};

if (localStorage.getItem("msgTemplateKB") == null) {
  localStorage.setItem("msgTemplateKB", JSON.stringify(msgTemplateKB));
}

if (localStorage.getItem("msgTemplate") == null) {
  localStorage.setItem("msgTemplate", JSON.stringify(msgTemplate));
}

// 获取可用模型
const LLmodels = ref([]);
chatapi.get_list_running_models().then((res) => {
  console.log(res);
  if (res.data.code == 200) {
    LLmodels.value = res.data.data;
    localStorage.setItem("LLmodels", JSON.stringify(res.data.data));
  }
});

const handleClick = (tab) => {
  console.log(tab);
};
</script>

<style>
</style>