<template>
  <button
    :class="isMatched?'Matched':''"
    :disabled="isMatched"
    class="CardGame"
    @click="setSelected"
  >
    <span v-if="isMatched" class="glyphicon glyphicon-ok-sign"></span>
    <span v-else :class="open?'Open':'Closed'">{{card.visualText}}</span>
  </button>
</template>
<script>
export default {
  name: "CardGame",
  props: {
    card: {
      type: [Object]
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
      this.$emit("setCardSelected", {
        card: this.card,
        index: this.index
      });
    }
  }
};
</script>
<style>
.CardGame {
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