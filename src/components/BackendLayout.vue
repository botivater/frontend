<template>
  <div>
    <div
      class="
        min-h-screen
        h-full
        w-full
        flex
        text-white
        bg-gray-700
        overflow-y-hidden
        relative
      "
    >
      <SideBar></SideBar>
      <ToastList />
      <div class="flex flex-col w-full h-screen justify-between overflow-y-auto">
        <div class="container mx-auto">
          <div class="max-w-6xl mx-auto p-4">
            <slot></slot>
          </div>
        </div>
        <FooterBlock />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './SideBar.vue';
import ToastList from './ToastList.vue';
import FooterBlock from './FooterBlock.vue';

export default defineComponent({
  name: 'BackendLayout',
  components: {
    SideBar,
    ToastList,
    FooterBlock,
  },
});
</script>
