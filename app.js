// DOM elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Generate event listener
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// Copy password to clipboard
clipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;
  if (!password) {
    return;
  }

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Your password has been copied to clipboard!");
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  // 1. Initialize a password variable
  // 2. Filter out unchecked types
  // 3. Loop over length call generator function
  // 4. Add the final password to the result variable
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;
  console.log(typesCount);

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );
  console.log(typesArr);

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }
  var finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Generator functions

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

console.log(getRandomLower());

/*
function getRandomUpper() {
  var upper = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  var big = upper.toUpperCase();
  return big;
} */

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
console.log(getRandomUpper());

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
console.log(getRandomNumber());

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
console.log(getRandomSymbol());
