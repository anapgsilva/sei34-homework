console.log('bonjour');

////////////////////////////DEMO - Jeffery

const validateNumber = function(str) {
  // removes non-numerals from string
  let numberStr = str.replace(/\D/g,'');
  if (numberStr.length > 11 || numberStr.length < 10) {
    return '0000000000';
  } else if (numberStr.length === 11 && numberStr.charAt(0) !== '1') {
    return '0000000000';
  } else if (numberStr.length === 11 && numberStr.charAt(0) === '1') {
    numberStr = numberStr.substring(1);
  }
  // console.log(numberStr);
  // invalid if number is not 10 digits long
  if (numberStr.length !== 10) {
    return '0000000000'
  } else if (numberStr.length === 10) {
    return `(${numberStr.substring(0,3)}) ${numberStr.substring(3,6)}-${numberStr.substring(6)}`;
  }
}
console.log( "input: '52345678901'", "output:", validateNumber('52345678901')) // invalid - length is 11 but first number is not 1. Expected output: 0000000000
console.log( "input: '1234ab56c789'", "output:", validateNumber('1234ab56c789') ); // invalid - after stripping characters, length is 9. Expected output: 0000000000
console.log( "input: '8234ab536c789'", "output:", validateNumber('-8234...ab536c789') ); // (823) 453-6789



///////// solution - Aleks
const test = (num) => {
    if (/\W/.test(num)) return false;
    if (num.length === 11 && num[0] === "1") return true;
    if (num.length !== 10) return false;
    return true;
}

const phoneTest = (num) => {
    if (test(num)) {
        if (num.length === 11) num = num.slice(1);
        num = num.replace(/(\d{3})(\d{3})(\d{4})/,'($1) $2-$3');
    }
    else {
        num = "00000000";
    }
    return num;
}

console.log(phoneTest("11234567890"));
console.log(phoneTest("21234567890"));
console.log(phoneTest("2234567890"));




///////////////////////////// version without regex

const phoneNumberCheck = {
  cleanNumber: function(num){
    let cleaned = [];
    let numberals = "0123456789";

    for (let i = 0; i < num.length; i++) {
      let currentNum = num[i];

      if(numberals.indexOf(currentNum) !== -1){
        cleaned.push(currentNum);
      }
    } // for
    cleaned = cleaned.join('');
    return cleaned
  },
  isValid: function(num){
    let cleanNumber = this.cleanNumber(num);
    if( cleanNumber.length === 11 && cleanNumber[0] === '1'){
      return cleanNumber.substr(1);
    } else if (cleanNumber.length === 10){
      return cleanNumber;
    } else {
      return "00000000";
    }
  },
  getFormattedNumber: function(num){
    const validNumber = this.isValid(num);
    const areaCode = validNumber.substr(0,3);
    const exchangeCode = validNumber.substr(3,3);
    const remaining = validNumber.substr(6);
    return `(${areaCode}) ${exchangeCode}-${remaining}`;
  }

}


console.log(phoneNumberCheck.cleanNumber('11234567890'));
console.log(phoneNumberCheck.cleanNumber('D112s3456!789?0sdf'));

console.log(phoneNumberCheck.isValid('11234567890'));
console.log(phoneNumberCheck.isValid('D1s3456!789?0sdf'));

console.log(phoneNumberCheck.getFormattedNumber('11234567890'));
