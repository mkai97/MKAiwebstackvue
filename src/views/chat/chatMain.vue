<template>
  <div style="width: 800px; height: 745px; position: relative">
    <div id="itemList" class="cvelayout">
      <cveItem v-for="item in list" :key="item.id" :item="item"></cveItem>
    </div>

    <div class="iptbox">
      <el-input
        style="width: 740px"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 3 }"
        placeholder="输入文字并按下回车键发送"
        @keyup.enter="sendMsg"
        v-model="textarea"
      >
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import cveItem from "./cveitem.vue";
import genID from "@/utils/genID";

import chatapi from "@/http/api";

const textarea = ref("");
const list = ref([]);
list.value = JSON.parse(localStorage.getItem("chatList")) || [];

const scrollToTarget = (domID) => {
    const itemListElement = document.getElementById('itemList');
    const targetElement = document.getElementById(domID);
    debugger
    if (itemListElement && targetElement) {
        console.log(targetElement.offsetTop)
        console.log(itemListElement.scrollTop)
      const scrollTopValue = targetElement.offsetTop;
      itemListElement.scrollTop = scrollTopValue;
    }
};
scrollToTarget(list.value[list.value.length - 1].msg_id)

var chatHistory = [];
const getChatHis = (limit = 3) => {
  limit = limit * 2;
  if (list.value.length > 0) {
    list.value.forEach((item) => {
      chatHistory.push({
        role: item.isSelf ? "user" : "assistant",
        content: item.content,
      });
    });
    return chatHistory.slice(
      chatHistory.length - (limit + 1),
      chatHistory.length - 1
    );
  }
};

function sendMsg() {
  console.log(textarea.value);
  const msgBody = {
    msg_id: genID(),
    content: textarea.value,
    time: new Date().toLocaleString(),
    isSelf: true,
  };
  list.value.push(msgBody);
  scrollToTarget(list.value[list.value.length - 1].msg_id)


  chatapi
    .chat_Send({
      query: msgBody.content,
      conversation_id: msgBody.msg_id,
      history: getChatHis(),
    })
    .then((res) => {
      var msgBody = {
        msg_id: res.message_id,
        content: res.text,
        time: new Date().toLocaleString(),
        isSelf: false,
      };

      console.log(res);
      list.value.push(msgBody);
      localStorage.setItem("chatList", JSON.stringify(list.value));
      scrollToTarget(list.value[list.value.length - 1].msg_id)
    });

  textarea.value = "";
}
</script>



<style scoped>
.cvelayout {
  width: 100%;
  height: 90%;
  overflow-y: auto;
}
.iptbox {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eee;
}
</style>