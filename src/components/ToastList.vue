<template>
  <div class="absolute z-10 bottom-0 right-0 mb-6 mr-6 w-2/6">
    <div class="grid grid-cols-1 gap-3">
      <transition
        v-for="toast in getToasts()"
        :key="toast"
        name="fade"
        :duration="1000"
      >
        <ToastItem
          :name="toast.name"
          :description="toast.description"
          :color="toast.color"
          v-if="!toast.hide"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import ToastItem from './ToastItem.vue';

export default defineComponent({
  name: 'ToastList',
  components: { ToastItem },
  computed: {
    ...mapGetters(['getToasts']),
  },
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
