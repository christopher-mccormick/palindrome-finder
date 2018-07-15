function reverse(test) {
  const reversed = [];
  const testLength = test.length;
  for (let i = 1; i <= testLength; i += 1) {
    reversed.push(test.charAt((testLength - i)));
  }
  return reversed.join('');
}

function isPalindrome(test, palindromes) {
  return test === reverse(test) && !palindromes.includes(test);
}

function longestPalindromes(palindromes, palindromeIndexes) {
  let numberOfPalindromes = 3;
  const longestPalindromesFound = [];
  if (palindromes.length < 3) {
    numberOfPalindromes = palindromes.length;
  }
  for (let i = 0; i < numberOfPalindromes; i += 1) {
    longestPalindromesFound.push(
      { text: palindromes.splice(-1, 1)[0], index: palindromeIndexes.splice(-1, 1)[0] },
    );
  }
  return longestPalindromesFound;
}

function generateResponseFormat(topThreePalindromes) {
  const numberOfPalindromes = topThreePalindromes.length;
  const formattedPalindromes = [];
  const formattedResponse = {};
  if (numberOfPalindromes < 3) {
    let verb = 'have';
    if (numberOfPalindromes === 1) {
      verb = 'has';
    }
    formattedResponse.additionalInformation = `Only ${numberOfPalindromes} ${verb} been found!`;
  }
  for (let i = 0; i < numberOfPalindromes; i += 1) {
    const { text } = topThreePalindromes[i];
    const { index } = topThreePalindromes[i];
    const { length } = topThreePalindromes[i].text;
    const response = `Text: ${text}, Index: ${index}, Length: ${length}`;
    formattedPalindromes.push(response);
  }
  formattedResponse.palindromes = formattedPalindromes;
  return formattedResponse;
}

export default async function check(stringToCheck) {
  const palindromes = [];
  const palindromeIndexes = [];
  const palindromeEndIndex = [];
  const stringToCheckLength = stringToCheck.length;
  for (let i = 0; i < stringToCheckLength; i += 1) {
    for (let j = 0; j < stringToCheckLength - i; j += 1) {
      const test = stringToCheck.substring(j, j + i + 1);
      if (isPalindrome(test, palindromes)) {
        const currentEndIndex = j + test.length;
        const palindromesLength = palindromes.length;
        for (let k = 0; k < palindromesLength; k += 1) {
          const existingPalidromeStartIndex = palindromeIndexes[k];
          const existingPalidromeEndIndex = palindromeEndIndex[k];
          if (existingPalidromeEndIndex
            && existingPalidromeEndIndex
            && existingPalidromeStartIndex >= j
            && existingPalidromeEndIndex <= currentEndIndex) {
            palindromeEndIndex.splice(k, 1);
            palindromeIndexes.splice(k, 1);
            palindromes.splice(k, 1);
            k -= 1;
          }
        }
        palindromeEndIndex.push(j + test.length);
        palindromeIndexes.push(j);
        palindromes.push(test);
      }
    }
  }
  const topThreePalindromes = longestPalindromes(palindromes, palindromeIndexes);
  const responseFormat = generateResponseFormat(topThreePalindromes);
  return responseFormat;
}
