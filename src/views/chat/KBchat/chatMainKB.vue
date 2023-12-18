<template>
  <div style="width: 800px; height: 745px; position: relative">
    <div id="itemList" class="cvelayout">
      <cveItem v-for="item in list" :key="item.id" :item="item"></cveItem>
    </div>

    <div v-loading="iptboxLoading" class="iptbox">
      <el-input
        style="width: 740px"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 3 }"
        placeholder="输入文字并按下回车键发送"
        @keydown.enter.prevent="handleKeyDown"
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
list.value = JSON.parse(localStorage.getItem("kbchatList")) || [];
const iptboxLoading = ref(false);

const scrollToTarget = (domID) => {
  const itemListElement = document.getElementById("itemList");
  const targetElement = document.getElementById(domID);

  if (itemListElement && targetElement) {
    console.log(targetElement.offsetTop);
    console.log(itemListElement.scrollTop);
    const scrollTopValue = targetElement.offsetTop;
    itemListElement.scrollTop = scrollTopValue;
  }
};
if (list.value.length > 0) {
  scrollToTarget(list.value[list.value.length - 1].msg_id);
}

var chatHistory = [];
const getChatHis = (limit = 3) => {
  limit = limit * 2;
  if (list.value.length > 0) {
    list.value.forEach((item) => {
      chatHistory.push({
        role: item.isSelf ? "user" : "assistant",
        content: item.content ? item.content : "-",
      });
    });
    return chatHistory.slice(
      chatHistory.length - (limit + 1),
      chatHistory.length - 1
    );
  }
};

function handleKeyDown(event) {
  if (event.shiftKey) {
    // 如果按下了Shift键，则进行换行处理
    textarea.value += "\n";
  } else {
    // 否则，按下回车键发送消息
    sendMsg();
  }
}

function sendMsg() {
  console.log(textarea.value);
  const msgBody = {
    msg_id: genID(),
    content: textarea.value,
    time: new Date().toLocaleString(),
    isSelf: true,
  };
  list.value.push(msgBody);
  scrollToTarget(list.value[list.value.length - 1].msg_id);

  iptboxLoading.value = true;
  chatapi
    .KBchat_Send(
      {
        query: msgBody.content,
        conversation_id: msgBody.msg_id,
        history: getChatHis(),
      },
      (Event) => {
        var msgBody = {
          msg_id: Event.message_id,
          content: Event.responseText,
          time: new Date().toLocaleString(),
          isSelf: false,
          docs: [],
        };

        console.log(Event, "Event");
        if (list.value[list.value.length - 1].msg_id == Event.message_id) {
          list.value[list.value.length - 1].content = Event.responseText;
          list.value[list.value.length - 1].docs = Event?.docs;
          localStorage.setItem("kbchatList", JSON.stringify(list.value));
          scrollToTarget(list.value[list.value.length - 1].msg_id);
        } else {
          list.value.push(msgBody);
        }

        textarea.value = "";
      }
    )
    .then((res) => {
      iptboxLoading.value = false;
      list.value = JSON.parse(localStorage.getItem("kbchatList")) || [];

    })
    .catch((err) => {
      iptboxLoading.value = false;
      console.log(err);
    });
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