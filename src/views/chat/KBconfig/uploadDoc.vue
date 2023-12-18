<template>
  <el-upload
    class="upload-demo"
    drag
    :action="chatapi.upload_file_KB"
    name="files"
    :data="params"
    multiple
    :on-success="handleSuccess"
    :on-error="handleError"
    :file-list="fileList"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        Drag and drop files here Limit 200MB per file • HTML, MD, JSON, JSONL,
        CSV, PDF, PNG, JPG, JPEG, BMP, EML, MSG, EPUB, XLSX, XLSD, IPYNB, ODT,
        PY, RST, RTF, SRT, TOML, TSV, DOCX, DOC, XML, PPT, PPTX, TXT, HTM
      </div>
    </template>
  </el-upload>
</template>
  
  <script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import chatapi from "@/http/api";
import { ref } from "vue";
import { ElNotification } from "element-plus";

const fileList = ref([]);

const params = ref({
  knowledge_base_name: JSON.parse(localStorage.getItem("currentKB")),
  override: true,
  to_vector_store: true,
  chunk_size: 300,
  chunk_overlap: 50,
  zh_title_enhance: true,
});

const emits = defineEmits(["uploadSuccess", "uploadError"]);

function handleSuccess(res) {
  console.log(res);
  var msg = "";
  if (res.data.failed_files) {
    msg = res.msg + ",失败文件:" + JSON.stringify(res.data.failed_files);
  } else {
    msg = res.msg;
  }
  ElNotification({
    type: "success",
    title: "上传成功",
    message: msg,
  });
  fileList.value = [];
  emits("uploadSuccess", res);
}
function handleError(err) {
  ElNotification({
    type: "error",
    title: "上传失败",
    message: res.msg,
  });
  console.log(err);
  fileList.value = [];
  emits("uploadError", err);
}
</script>