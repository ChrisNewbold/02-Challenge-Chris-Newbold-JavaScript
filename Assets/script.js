// Assignment Code
// I decided to go with const instead of var for this exercise to help keep the code as clean as possible as there should be no need for the identifier to be reassigned.
const characterAmountRange = document.getElementById("characterAmountRange")
const characterAmountNumber = document.getElementById("characterAmountNumber")
const includeLowercaseElement = document.getElementById("includeLowercase")
const includeUppercaseElement = document.getElementById("includeUppercase")
const includeNumbersElement = document.getElementById("includeNumbers")
const includeSymbolsElement = document.getElementById("includeSymbols")
const form = document.getElementById("passwordGeneratorForm")
const passwordDisplay = document.getElementById("passwordDisplay")
// this sets up the list of character codes dictating the lowercase, uppercase, numbers and symbols called using an = array call from low to high (used the ASCII table & Cheat sheet to assist)
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
// event listener that triggers everytime the input amount changes and syncs the slider and the input section
characterAmountNumber.addEventListener("input", syncCharacterAmount)
characterAmountRange.addEventListener("input", syncCharacterAmount)
// this event listener triggers everytime we submit the form and will prevent the form from submitting and resetting the page
form.addEventListener("submit", function (e) {
  e.preventDefault()//this prevents the default action of the form which is to submit the data
  // This "if" section creates a pop up prompting the user to select a tick box. 
  if (!form.includeLowercase.checked && !form.includeUppercase.checked
    && !form.includeSymbols.checked && !form.includeNumbers.checked) {
    alert("at least one box must be checked")
  }
  // this tells us if its true or false if button is checked and speaks to the character amount passing the value
  const characterAmount = characterAmountNumber.value
  const includeLowercase = includeLowercaseElement.checked
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeSymbols = includeSymbolsElement.checked
  // tells the script to generate a password calling the variables and values speaking to the selecter elements 
  const password = generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password
})
// this uses charCodes to return our unicode and tells it what to include "if". So essentially tells it what to generate the password from
function generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = [] // this sets our charCode default to zero
  if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES), includeLowercaseElement.checked = false // this resets the check box to being unchecked
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES), includeUppercaseElement.checked = false // this resets the check box to being unchecked
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES), includeSymbolsElement.checked = false // this resets the check box to being unchecked
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES), includeNumbersElement.checked = false; // this resets the check box to being unchecked
  // this creates the loop
  const passwordCharacters = [] // this is a empty array that stores all our passwords
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)] // multiplies a random number between zero and character amount and makes sure it's a integer by doing math dot.floor giving us our charCode
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  // this is dictating what is returned from the array
  return passwordCharacters.join("")
}
// this creates a funtion that generates our arrays and loops through all the variables from low to high then returns the array
function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}
// this funtion links the slider to the character amount input
function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}
// this is the 'copy password' clipboard script
clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = passwordDisplay.innerText;

  if (!password) { return; }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
