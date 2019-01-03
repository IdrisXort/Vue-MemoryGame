<template>
  <div class="col-xs-4" @click="changeVisibility">
    <h1 :style="{color:'green', visibility:visib}">{{quote}}</h1>
  </div>
</template>
<script>
export default {
  props: ["quote", "opaco", "isFound"],
  data: function() {
    return {
      visib: "hidden"
    };
  },
  methods: {
    changeVisibility: function() {
      if (this.visib == "hidden") {
        this.visib = "visible";
      } else {
        this.visib = "hidden";
      }
    }
  }
};
</script>
<style scoped>
div {
  padding: 10px;
  margin: auto;
  border: 1px solid gray;
  border-radius: 10%;
  width: 25%;
  text-align: center;
}
div:hover {
  background-color: aquamarine;
  cursor: pointer;
}
h1.found {
  background-color: aqua;
  color: chartreuse;
}
h1.notFound {
  background-color: bisque;
}
</style>

