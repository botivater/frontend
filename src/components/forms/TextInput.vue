<template>
  <div>
    <label for="speakText">
      <span class="block" v-if="label">{{ label }}:</span>
      <input
        type="text"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :value="modelValue"
        @keypress="$emit('update:modelValue', $event.target?.value)"
        @input="$emit('update:modelValue', $event.target?.value)"
        class="
          rounded-md
          shadow-md
          bg-gray-800
          text-white
          p-2
          placeholder:text-gray-500
          w-full
        "
      />
    </label>
    <small class="block" v-if="description">{{ description }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  props: ['name', 'label', 'placeholder', 'description', 'modelValue'],
});
</script>
