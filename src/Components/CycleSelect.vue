<template>
  <select v-model="selectedValue">
    <option :value="null" disabled>Select a game</option>
    <option v-for="option in options" :key="option.id" :value="option.id">{{ option.text }}</option>
  </select>
</template>

<script>
export default {
  name: "CycleSelect",
  props: {
    options: {
      type: Array
    }
  },
  data() {
    return {
      selectedValue: null
    };
  },
  watch: {
    selectedValue(newVal) {
      if (newVal) this.$emit("selected", newVal);
    }
  }
};
</script>