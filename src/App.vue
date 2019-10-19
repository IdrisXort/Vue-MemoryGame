<template>
  <div class="col-md-12">
    <div class="col-md-4">
      <CycleSelect name="gameSelector" :options="games" @selected="setSelectedGame" />
    </div>
    <br />
    <div class="col-md-8" v-if="isMemoryGame">
      <card-game
        name="number"
        v-for="(number,index) in initialNumberArray"
        :card="number"
        :index="index"
        :key="index"
        @setCardSelected="setSelectedNumber"
        :isMatched="isThisCardMatched(index)"
        :open="isThisCardOpen(index)"
      />
    </div>
    <div class="col-md-8" v-if="isLanguageGame">
      <div class="row">
        <div class="col-md-6">
          <template v-for="lang in languages">
            <input
              type="radio"
              :id="lang.code"
              name="firstLanguage"
              :value="lang.code"
              v-model="selectedLanguage1"
              :key="lang.code"
            />
            <label class="language" :key="lang.language" :for="lang.code">{{lang.language}}</label>
          </template>
        </div>
        <div class="col-md-6">
          <template v-for="lang in languages.filter(lang=>lang.code!==selectedLanguage1)">
            <input
              v-if="selectedLanguage1"
              type="radio"
              :id="lang.code"
              name="secondLanguage"
              :value="lang.code"
              v-model="selectedLanguage2"
              :key="lang.code"
            />
            <label class="language" :key="lang.language" :for="lang.code">{{lang.language}}</label>
          </template>
        </div>
      </div>
      <template v-if="selectedLanguage1 && selectedLanguage2">
        <card-game
          name="word"
          v-for="(word,index) in wordCombinations"
          :card="word"
          :index="index"
          :key="index"
          @setCardSelected="setSelectedNumber"
          :isMatched="isThisCardMatched(index)"
          :open="isThisCardOpen(index)"
        />
      </template>
    </div>
    <button v-if="selectedGame" @click="refreshGame">Refresh Game</button>
  </div>
</template>
<script>
import { Games, Dictionary, Languages } from "./Constants/GameConstants";
import CardGame from "./Components/CardGame.vue";
import CycleSelect from "./Components/CycleSelect.vue";
export default {
  components: {
    CardGame,
    CycleSelect
  },
  data() {
    return {
      initialNumberArray: [],
      selectedCard1: null,
      selectedCard2: null,
      error: null,
      matchedCards: [],
      games: Games,
      languages: Languages,
      dictionary: Dictionary,
      selectedGame: null,
      selectedLanguage1: 'TR',
      selectedLanguage2: null
    };
  },
  created() {
    this.refreshGame();
  },
  methods: {
    getArray() {
      const arr = new Array(12).fill().map(() => {
        const randomNumber = Math.round(Math.random() * 40);
        return { text: randomNumber, visualText: randomNumber };
      });
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
    },
    setSelectedGame(gameId) {
      this.selectedGame = gameId;
      this.refreshGame();
    }
  },
  computed: {
    areBothCardsSelected() {
      return !!(this.selectedCard1 && this.selectedCard2);
    },
    areCardsMatching() {
      return (
        this.areBothCardsSelected &&
        this.selectedCard1.card.text === this.selectedCard2.card.text
      );
    },
    cardsAreNotMatching() {
      return (
        this.areBothCardsSelected &&
        this.selectedCard1.card.text !== this.selectedCard2.card.text
      );
    },
    isSecondCardChosen() {
      return !!this.selectedCard2;
    },
    isMemoryGame() {
      return this.selectedGame === "Memory";
    },
    isLanguageGame() {
      return this.selectedGame === "Language";
    },
    wordCombinations() {
      let translated = [];
      this.dictionary.map(words => {
        translated.push({
          // shows english word
          text: words[this.selectedLanguage1],
          visualText: words[this.selectedLanguage2]
        });
        translated.push({
          //shows turkish word
          text: words[this.selectedLanguage1],
          visualText: words[this.selectedLanguage1]
        });
      });
      return this.shuffle(translated);
    }
  }
};
</script>
<style>
.language {
  font-size: 18px;
}
</style>