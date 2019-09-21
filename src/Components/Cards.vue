<template>
  <div>
    <CardNumber :number="number" :index="index" v-for="(number,index) in numbers" :key="index" />
  </div>
</template>
<script>
import CardNumber from "./CardNumber.vue";
export default {
  components: {
    CardNumber
  },
  props: {
    numbers: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style>
</style>