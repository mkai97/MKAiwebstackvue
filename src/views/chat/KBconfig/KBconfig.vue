<template>
  <div style="padding: 45px; overflow: scroll; background: #fff">
    <el-form
      :label-position="'top'"
      label-width="100px"
      style="max-width: 700px"
    >
      <el-form-item label="当前知识库">
        <el-select
          v-model="currentKB"
          @change="changeKB"
          placeholder="请选择知识库"
          size="large"
        >
          <el-option
            v-for="item in kblist"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <addKBBtn @add-k-b-success="addKBSuccess"></addKBBtn>
      </el-form-item>
      <el-form-item label="上传文档">
        <uploadDoc
          @uploadSuccess="uploadSuccess"
          @uploadError="uploadError"
        ></uploadDoc>
      </el-form-item>

      <el-form-item label="知识库文件">
        <el-table
          :data="formLabel.kbfilelist"
          stripe
          style="width: 100%; height: 450px"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="fileName" label="知识库文件" width="380" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="text" @click="showDoc(scope.row)">
                查看
              </el-button>
              <el-button type="text" @click="downloadDoc(scope.row)">
                下载
              </el-button>

              <el-popconfirm
                @confirm="delDoc(scope.row)"
                title="确定要删除该文件么？"
              >
                <template #reference>
                  <el-button type="text"> 删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import chatapi from "@/http/api.js";
import uploadDoc from "./uploadDoc.vue";
import { ElNotification } from "element-plus";

import addKBBtn from "./addKBmodal.vue";

const kblist = ref([]);
const kbfilelist = ref([]);
const currentKB = ref({});
const formLabel = ref({
  kblist: [],
  kbfilelist: [],
});

const addKBSuccess = (e) => {
  console.log(e);
  localStorage.setItem("currentKB", JSON.stringify(e.kbname));
  currentKB.value = e.kbname;

  getKBlist();

};

function getKBlist() {
  chatapi
    .get_list_knowledge_base()
    .then((res) => {
      kblist.value = res.data.data;
      if (localStorage.getItem("currentKB")) {
        currentKB.value = JSON.parse(localStorage.getItem("currentKB"));
      } else {
        localStorage.setItem("currentKB", JSON.stringify(kblist.value[0]));
        currentKB.value = kblist.value[0];
      }
      getKBfilelist();
    })
    .catch((err) => {});
}
async function getKBfilelist() {
  chatapi
    .get_KB_list_files({
      knowledge_base_name: currentKB.value,
      query: "",
    })
    .then((res) => {
      formLabel.value.kblist = kblist.value;
      console.log(res);
      kbfilelist.value = res.data.data;
      formLabel.value.kbfilelist = kbfilelist.value.map((item) => {
        return {
          fileName: item,
        };
      });
    });
}

getKBlist();

const uploadSuccess = (e) => {
  console.log(e);
  getKBfilelist();
};
const uploadError = (e) => {
  console.log(e);
  getKBfilelist();
};

function changeKB(e) {
  currentKB.value = e;
  debugger;
  localStorage.setItem("currentKB", JSON.stringify(currentKB.value));
  getKBfilelist();
}
function downloadDoc(row) {
  chatapi
    .download_doc({
      knowledge_base_name: currentKB.value,
      file_name: row.fileName,
    })
    .then((res) => {
      console.log(res);
      // 创建Blob URL
      const url = window.URL.createObjectURL(new Blob([res]));

      // 创建下载链接
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", row.fileName);

      // 点击链接下载文件
      link.click();

      // 清理Blob URL
      window.URL.revokeObjectURL(url);
    });
}
function showDoc(row) {
  chatapi
    .show_doc({
      knowledge_base_name: currentKB.value,
      file_name: row.fileName,
    })
    .then((res) => {
      console.log(res);
      // 创建Blob URL
      const url = window.URL.createObjectURL(new Blob([res]));

      // 创建下载链接
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", row.fileName);

      // 点击链接下载文件
      link.click();

      // 清理Blob URL
      window.URL.revokeObjectURL(url);
    });
}
function delDoc(row) {
  debugger;
  chatapi
    .delete_docs({
      knowledge_base_name: currentKB.value,
      file_names: [row.fileName],
    })
    .then((res) => {
      console.log(res);
      ElNotification({
        title: "删除成功",
        message: res.msg,
        type: "success",
        duration: 2000,
      });
      getKBfilelist();
    });
}
</script>

<style scoped>
div {
  color: #000;
}
</style>