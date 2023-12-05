<template>
<div class="logoBox">
    <img :src="layoutStore.logoUrl" alt="logo" srcset="" />
    <div class="logo-text">
        <span>{{layoutStore.webTitle}}</span>
    </div>
</div>
</template>

<script setup>
import { useLayoutStore } from '@/store/modules/index';
const layoutStore = useLayoutStore();
</script>

<style scoped>
.logoBox{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    border-bottom: #ffffffc0 1px solid;
}
.logoBox img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.logo-text {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
}
</style>