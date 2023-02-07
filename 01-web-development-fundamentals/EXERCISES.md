# Exercises

## Echo
> Write a function echo that takes in a string and console.logs that string "echo-ized". Analyze the example test cases to see the expected "echo-ized" output of the function.

```javascript
function echo(string) {
  console.log(`\
  ${string.toUpperCase()} ... \
  ${string} ... \
  ${string.toLowerCase()} \
  `);
}
```

## Vowel Counter

> Write a function, countVowels(word), that takes in a string word and returns the number of vowels in the word.
Vowels are the letters "a", "e", "i", "o", "u".

```javascript
function countVowels(word) {
    const vowels = "aeiouAEIOU";
    let vowelCount = 0;
    for (let i = 0; i < word.length; i++) {
        if (vowels.indexOf(word[i]) !== -1) {
            vowelCount++;
        }
    }
    return vowelCount;
};
```
