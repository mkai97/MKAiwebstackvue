<template>
  <div v-html="renderedMarkdown"></div>
</template>
  
  <script setup>
import MarkdownIt from "markdown-it";
import { ref } from "vue";

const props = defineProps(["docs"]);
let markdown = props.docs;
console.log(markdown);
const renderedMarkdown = ref("");

const formatText = (markdown) => {
  markdown = markdown ? markdown : "无";
  const md = new MarkdownIt();
  return md.render(markdown);
};
renderedMarkdown.value = formatText(markdown);
</script>