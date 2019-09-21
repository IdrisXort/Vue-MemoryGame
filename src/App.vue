<template>
  <div class="col-md-12">
    <div class="col-md-12">
      <card-number
        v-for="(number,index) in initialNumberArray"
        :number="number"
        :index="index"
        :key="index"
        @setNumberSelected="setSelectedNumber"
        :isMatched="isThisCardMatched(index)"
        :open="isThisCardOpen(index)"
      />
    </div>
    <button @click="refreshGame">Refresh Game</button>
  </div>
</template>
<script>
import CardNumber from "./Components/CardNumber.vue";
export default {
  components: {
    CardNumber
  },
  data() {
    return {
      initialNumberArray: [],
      selectedCard1: null,
      selectedCard2: null,
      error: null,
      matchedCards: []
    };
  },
  created() {
    this.refreshGame();
  },
  methods: {
    getArray() {
      const arr = new Array(12)
        .fill()
        .map(() => Math.round(Math.random() * 40));
      return arr.concat(arr);
    },
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    refreshGame() {
      this.initialNumberArray = [];
      this.selectedCard1 = null;
      this.selectedCard2 = null;
      this.error = null;
      this.matchedCards = [];
      this.initialNumberArray = this.shuffle(this.getArray());
    },
    setSelectedNumber(cardObject) {
      if (this.selectedCard1) {
        if (this.selectedCard1.index !== cardObject.index) {
          this.selectedCard2 = cardObject;
        } else {
          this.error = "Double click to the same Card !!";
        }
      } else {
        this.selectedCard1 = cardObject;
      }
    },
    resetSelectedNumbers() {
      this.selectedCard1 = null;
      this.selectedCard2 = null;
    },
    isThisCardMatched(index) {
      return !!this.matchedCards.filter(card => card.index === index)[0];
    },
    isThisCardOpen(index) {
      if (this.selectedCard2 && this.selectedCard2.index === index) {
        var makeItWait;
        makeItWait = setTimeout(() => {
          if (this.areCardsMatching) {
            this.matchedCards.push(this.selectedCard1);
            this.matchedCards.push(this.selectedCard2);
          }
          this.resetSelectedNumbers();
          return false;
        }, 500);
        return true;
      }
      return this.selectedCard1 && this.selectedCard1.index === index;
      // return (this.selectedCard1 && this.selectedCard1.index === index) || (this.selectedCard2 && this.selectedCard2.index === index)
    }
  },
  computed: {
    areBothCardsSelected() {
      return !!(this.selectedCard1 && this.selectedCard2);
    },
    areCardsMatching() {
      return (
        this.areBothCardsSelected &&
        this.selectedCard1.number === this.selectedCard2.number
      );
    },
    cardsAreNotMatching() {
      return (
        this.areBothCardsSelected &&
        this.selectedCard1.number !== this.selectedCard2.number
      );
    },
    isSecondCardChosen() {
      return !!this.selectedCard2;
    }
  }
};
</script>
<style>
body {
  font-size: 75px;
}
</style>