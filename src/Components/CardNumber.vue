<template>
  <button
    :class="isMatched?'Matched':''"
    :disabled="isMatched"
    class="CardNumber"
    @click="setSelected"
  >
    <span v-if="isMatched" class="glyphicon glyphicon-ok-sign"></span>
    <span v-else :class="open?'Open':'Closed'">{{number}}</span>
  </button>
</template>
<script>
export default {
  name: "CardNumber",
  props: {
    number: {
      type: Number
    },
    index: {
      type: Number
    },
    isMatched: {
      type: Boolean
    },
    open: {
      type: Boolean
    }
  },
  methods: {
    setSelected() {
      this.$emit("setNumberSelected", {
        number: this.number,
        index: this.index
      });
    }
  }
};
</script>
<style>
.CardNumber {
  height: 200px;
  width: 200px;
  background: yellow;
}
.Closed {
  visibility: hidden;
}
.Open {
    font-size: 70px;
  visibility: visible;
}
.Matched {
  background: red;
}
</style>