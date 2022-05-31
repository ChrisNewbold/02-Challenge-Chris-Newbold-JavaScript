// Assignment Code
const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeLowercaseElement = document.getElementById('includeLowercase')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')
// this dictates the lowercase, uppercase, numbers and symbols called
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)
// this dictates the main trigger to begin the password generator
characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)
// this is what generates the password submition
form.addEventListener('submit', function (e) {
  e.preventDefault()
  // This section creates a pop up prompting the user to select a tick box
  if (!form.one.checked && !form.two.checked
    && !form.three.checked && !form.four.checked) {
    alert('at least one box must be checked')
  }
  const characterAmount = characterAmountNumber.value
  const includeLowercase = includeLowercaseElement.checked
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeSymbols = includeSymbolsElement.checked
  const password = generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password
})
// this is the over all list of all our character codes that is then looped
function generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = []
  if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES), includeLowercaseElement.checked = false
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES), includeUppercaseElement.checked = false
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES), includeSymbolsElement.checked = false
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES), includeNumbersElement.checked = false;
  // this creates the loop
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  // this is dictating what is returned from the array
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}

clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = passwordDisplay.innerText;

  if (!password) { return; }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});