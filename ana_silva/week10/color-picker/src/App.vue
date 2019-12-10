<template>
  <div id="container" v-on:mousemove="changeBgColor" v-bind:style="{ backgroundColor: this.hex}">

    <h1>Color Picker</h1>

    <div class="color">
      <h4>Hex: {{this.hex}}</h4>
      <h4>RGB: ({{this.rgb}})</h4>
      <h4>HSL: ({{this.hsl}})</h4>
    </div>

  </div>
</template>


<script>

  export default {
    name: 'app',
    data() {
      return {
        hex: "#000000",
        rgb: "",
        hsl: ""
      }
    },
    methods: {
      changeBgColor(event) {
        const height = event.view.innerHeight - 2;
        const width = event.view.innerWidth;
        const left = event.clientX;
        const top = event.clientY;

        //convert to hue and light, saturation is 0.5
        //https://www.rapidtables.com/convert/color/hsl-to-rgb.html
        const H = left*360/width;
        // console.log('H', H);
        const S = 0.5;
        const L = top/height;
        this.hsl = `${Math.floor(H)}, ${S}, ${L.toPrecision(2)}`;

        const C = (1- Math.abs(2*L-1)) * S;
        const X = C * (1- Math.abs((H/60) % 2 - 1));
        const m = L - C/2;
        let [R, G, B] = [0, 0 ,0];

        if (H >= 300) {
          [R, G, B] = [C, 0, X];
        } else if (H >= 240) {
          [R, G, B] = [X, 0, C];
        } else if (H >= 180) {
          [R, G, B] = [0, X, C];
        } else if (H >= 120) {
          [R, G, B] = [0, C, X];
        } else if (H >= 60) {
          [R, G, B] = [X, C, 0];
        } else if (H >= 0) {
          [R, G, B] = [C, X, 0];
        }

        const r = Math.floor((R + m) * 255);
        const g = Math.floor((G + m) * 255);
        const b = Math.floor((B + m) * 255);
        this.rgb = `${r}, ${g}, ${b}`;

        //convert to hex
        const findHex = function (number, hex) {
          if (hex.length === 2) {
            return hex;
          }
          else {
            let remainder = number % 16;
            if (remainder < 10) {
              hex = remainder + hex;
            } else {
              let index = [10,11,12,13,14,15].findIndex(n => n === remainder);
              const letters = ["a", "b", "c", "d", "e", "f"];
              hex = letters[index] + hex;
            }
            let division = Math.floor(number/16);
            return findHex(division, hex);
          }
        }

        let hex1 = findHex(r, '');
        let hex2 = findHex(g, '');
        let hex3 = findHex(b, '');

        this.hex = `#${hex1}${hex2}${hex3}`;
      }
    }
  };
</script>



<style>

body {
  width: 100vw;
  height: 100vh;
}

#container {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  text-shadow: -1px 0 #eee, 0 1px #eee, 1px 0 #eee, 0 -1px #eee;
}

h1 {
  padding: 30px;
}

div.color {
  text-align: center;
  margin-top: 70vh;
}


</style>
