console.log("hallo");

const dashatize = (input) => {

  let number = Math.abs(input);

  if(Number.isNaN(number)){
    return input;
  }
  let array = (""+number).split("");
  let dashed = "";

  console.log({array});

  for (let i = 0; i < array.length; i++) {
    if(Number(array[i]) % 2 !== 0){
      dashed += '-' + array[i] + '-';
    } else {
      dashed += array[i];
    }
  }

  dashed = dashed.replace(/--/g, '-');

  if(dashed[0] === '-'){
    dashed = dashed.substr(1, dashed.length);
  }

  if(dashed[dashed.length-1] === '-'){
    dashed = dashed.substr(0, dashed.length-1);
  }

  return dashed;
};


console.log(dashatize(86320));
console.log(dashatize(5311));
console.log(dashatize(974302));
console.log(dashatize(NaN));
console.log(dashatize(0));
console.log(dashatize(-1));
console.log(dashatize(-28369));
