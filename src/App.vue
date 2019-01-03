<template>
  <div class="col-md-12">
    <!-- <load-bar :quoteCount='quotes.length' :maxQuotes='maxQuotes'>
      <div :style="{width:percent*10+'%'}" class="cocuk">{{percent}}/10</div>
    </load-bar>
    <p>Add A new Quote</p>
    <div>
      <textarea id="inputText" @change.prevent="setQuote" required class="text"></textarea>
      <button @click.prevent="addNewQuote">New Quote</button>
    </div>-->
    <!-- <app-quote  v-for="(quo, index) in quotes" :key="quo" :quote="quo" @click.native="deleteQuote(index)" /> -->
    <div class="col-md-12">
      <app-quote
        v-for="(quo,index) in selectedQuotes"
        :key="quo+''+index"
        :quote="quo"
        @click.native="getQuo(index)"
      />
    </div>
    <button @click="getArray">Refresh Game</button>
  </div>
</template>

<script>
var Quote = require("./Components/Quote.vue");
var LoadBarVue = require("./Components/LoadBar.vue");
export default {
  components: {
    appQuote: Quote,
    loadBar: LoadBarVue
  },
  data: function() {
    return {
      quotes: [],

      quoYek: null,
      quoDu: null,

      firstIndex: -1,
      secondIndex: -1
    };
  },
  created: function() {
    this.getArray();
  },
  computed: {
    selectedQuotes() {
      if (this.firstIndex != this.secondIndex) {
        if (
          this.firstIndex > -1 &&
          this.secondIndex > -1 &&
          this.firstIndex != this.secondIndex
        ) {
          if (this.quoYek == this.quoDu) {
            this.quotes.splice(this.firstIndex, 1);
            if (this.secondIndex > this.firstIndex) {
              this.quotes.splice(this.secondIndex - 1, 1);
            } else {
              this.quotes.splice(this.secondIndex, 1);
            }

            this.reset();
            return this.quotes;
          } else {
            this.quotes=this.quotes;
            this.reset();
            return this.quotes
          }
        } else {
          return this.quotes;
        }
      } else {
        this.reset();
        return this.quotes;
      }
    }
  },
  methods: {
    addNewQuote: function() {
      if (this.quotes.length < 20) {
        this.quotes.push(this.currentQuote);
        this.percent++;
        document.getElementById("inputText").value = "";
        this.currentQuote = "";
      } else {
        alert("You can not add more quotes, to delete one please click on it");
      }
    },
    setQuote: function(event) {
      this.currentQuote = event.target.value;
    },
    deleteQuote: function(index) {
      this.quotes.splice(index, 1);
      this.percent--;
    },
    reset: function() {
      this.quoYek = null;
      this.quoDu = null;
      this.firstIndex = -1;
      this.secondIndex = -1;
    },
    getQuo: function(index) {
      if (!this.quoYek) {
        this.quoYek = this.quotes[index];
        this.firstIndex = index;
      } else if (!this.quoDu) {
        this.quoDu = this.quotes[index];
        this.secondIndex = index;
      }
    },
    getArray: function() {
      const arr = Array(10)
        .fill()
        .map(() => Math.round(Math.random() * 40));
      this.quotes = arr.concat(arr);
      (this.quoYek = null),
        (this.quoDu = null),
        (this.firstIndex = -1),
        (this.secondIndex = -1);
    }
  }
};
</script>
<style scoped>
div {
  padding: 5%;
  border: 1px solid gray;
  border-radius: 10%;
  width: 75%;
  background-color: saddlebrown;
  display: inline-block;
}
</style>

