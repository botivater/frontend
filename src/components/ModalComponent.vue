<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
        <div class="modal-container">
          <div class="">
            <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
          </div>
        </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalComponent',
  props: ['show'],
});
</script>

<style lang="postcss">
.modal-mask {
  z-index: 9998;
  transition: opacity 0.3s ease;
  @apply fixed top-0 left-0 flex justify-center items-center h-full w-full bg-black bg-opacity-50;
}

.modal-container {
  transition: all 0.3s ease;
  @apply rounded-md shadow-md max-w-xl mx-3 bg-white py-4 px-6 w-3/4;
}

.modal-header h3 {
  @apply mt-0 text-black font-semibold;
}

.modal-body {
  @apply px-0 py-4
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
