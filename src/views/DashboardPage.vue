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
      "
    >
      <SideBar></SideBar>
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto p-4">
          <div>
            <h1 class="text-xl font-semibold">Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
    <!-- <FooterBlock></FooterBlock> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '@/components/SideBar.vue';
// import FooterBlock from '@/components/FooterBlock.vue';

export default defineComponent({
  name: 'DashboardPage',
  components: {
    SideBar,
  },
});
</script>
