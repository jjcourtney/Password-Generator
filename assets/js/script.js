
// global variables
let includeLower;
let includeUpper;
let includeNum;
let includeSpecial;
const passwordText = document.querySelector("#password");
let passwordLength;

// Assignment Code
const generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = generatePassword();

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// creates and returns an array across a range of values 
function generateArray(first, last) {
  let tmpArr = [];

  for (let i = first-1; i < last; i++){
    tmpLetter = String.fromCodePoint(i);
    tmpArr.push(tmpLetter)
  }
  return tmpArr
}

function generateCompleteArray(){
  let includedCharacters = []
  // create indiviual arrays depending on users selections
  
  // fromCodePoint references 
  // lowercase 98 to 123
  // Uppercase 66 to 91
  // numbers 49 to 58
  // Special 33 to 48
  // Special 59 to 65

  if (includeLower){
    includedCharacters.push(generateArray(98, 123));
  }
  if (includeUpper){
    includedCharacters.push(generateArray(66, 91));
  }
  if (includeNum){
    includedCharacters.push(generateArray(49, 58));
  }
  if (includeSpecial){
    includedCharacters.push(generateArray(36, 48));
    includedCharacters.push(generateArray(59, 65));
  }

  // concat individual arrays to create one complete array of all the included chars
    let completeIncludedChar = includedCharacters[0];
  
  for (let i = 1; i < includedCharacters.length; i++){

    completeIncludedChar = completeIncludedChar.concat(includedCharacters[i]);
  
  }
  return completeIncludedChar;
}

  // function takes users inputs to define properties of the password
function generatePassword() {

  // get the user input
  passwordLength = getPasswordLength();
  includeLower = confirm("Would you like to include: \n Lower case characters?");
  includeUpper = confirm("Would you like to include: \n Upper case characters?");
  includeNum = confirm("Would you like to include: \n Numbers?");
  includeSpecial = confirm("Would you like to include: \n Special case characters?");

  if (includeLower || includeUpper || includeNum || includeSpecial){

    return chooseCharacters();
    
  }
  else{
    alert("Please choose atleast one option");

    // if the user has not selected one option input, use recursion
    return generatePassword();
  }
};

  // creates and returns the password of length passwordLength, using random characters from the array return from generateCompleteArray()
function chooseCharacters(){
  let posibleCharacters = generateCompleteArray(); // Creates an array with all possible characters
  let userPassword = ""; 
  for (let i = 0; i < passwordLength; i++){ // creates password character at a time
    let randomIndex = Math.floor(Math.random() * posibleCharacters.length); //selects a random character
    userPassword += posibleCharacters[randomIndex];
  }
  return userPassword;
}

// Prompts user for a password length then check validity, until valid.
function getPasswordLength() {
  passwordLength = prompt("How long would you like the password to be?\nMin 8, max 128");
  isNum = /^\d*\.?\d+$/.test(passwordLength); // checks regex for number only
  if (isNum && passwordLength <= 128 && passwordLength >= 8){
    return passwordLength;
  }else{
    return getPasswordLength();
  }
}

