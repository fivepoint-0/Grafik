<template>
  <div id="MainDiv">
      Perceptron page
  </div>
</template>

<script src="lib/p5/p5.min.js"></script>
<script src="../../../lib/p5/addons/p5.dom.min.js"></script>
<script src="./main-sketch/config.js"></script>
<script src="./main-sketch/Perceptron.js"></script>

<script>

if (process.browser) {
  var sketch = require('./main-sketch/sketch')
}
export default {
 data() {
   message: ""
 },
 mounted() {
    const p5 = require('p5')
    new p5(sketch.MainSketch)
    sketch.setDelegate(this.callbackOnp5);
  },
  methods: {
    callbackOnp5: function(timeStr) {
      this.message = timeStr;
    }
  }
}
</script>


<style>

</style>