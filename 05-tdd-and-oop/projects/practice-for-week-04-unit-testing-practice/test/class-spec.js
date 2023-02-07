const chai = require("chai");
const expect = chai.expect;

const { Word } = require("../class");

describe("Word", function () {
  describe("Word constructor function", function () {
    let newWord;
    before(function () {
      newWord = new Word('test');
    });


    it('should have a "word" property', function () {

      expect(newWord).to.have.all.keys('word');
    });
  
    it('should set the "word" property when a new word is created', function () {
      expect(newWord.word).to.deep.equal('test');
    });
  });

  describe("removeVowels function", function () {

    let newWord;
    before(function() {
      newWord = new Word ('xOing');
    }) 


    it("should return a the word with all vowels removed", function () {
      const answer = newWord.removeVowels();
      expect(answer).to.deep.equal('xng');
    });
  });

  describe("removeConsonants function", function () {
    it("should return the word with the consonants removed", function () {
      let newWord = new Word('xOing');
      const answer = newWord.removeConsonants();
      expect(answer).to.deep.equal('Oi');
    });
  });
  
  describe("pigLatin function", function () {
    it("should return the word converted to pig latin", function () {
      const word1 = new Word ('pig');
      const answer1 = word1.pigLatin();

      const word2 = new Word ('omelet');
      const answer2 = word2.pigLatin();

      expect(answer1).to.deep.equal('igpay');   
      expect(answer2).to.deep.equal('omeletyay');

    });
  });
});