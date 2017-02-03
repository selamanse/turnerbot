/*
* Turner Module
*
*/
'use strict'

const assert = require('assert')
const Promise = require('promise')
const wiktionaryUrl = 'https://de.wiktionary.org/w/api.php?action=query&format=json&titles='
const https = require('https')
const querystring = require('querystring')
const vowels = ['a', 'e', 'i', 'o', 'u', 'ä', 'ö', 'ü']

module.exports = turner

function turner () {
  this.validate = function (inputText) {
    var turner = []
    var words = inputText.split(' ')
    var turnedWords = []
    var isWordPromises = []

    // allow only 2 word sentences for now
    if (words.length !== 2) {
      console.log('only 2 words are supported')
      return new Promise(function (resolve, reject) { resolve(false) })
    }

    // validate words
    for (var i = 0; i < words.length; i++) {
      console.log('checking word: ' + words[i])
      isWordPromises.push(isWord(words[i]))
      // prepare turn
      var tmpturner = splitVowel(words[i])
      console.log(tmpturner)
      turner.push(tmpturner)
    }

    // turn words
    turnedWords.push(turner[1][0] + turner[0][1])
    turnedWords.push(turner[0][0] + turner[1][1])

    // validate turned words
    for (var j = 0; j < turnedWords.length; j++) {
      console.log('checking word: ' + turnedWords[j])
      isWordPromises.push(isWord(turnedWords[j]))
    }

    return Promise.all(isWordPromises)
      .then(function (res) {
        for (var k = 0; k < res.length; k++) {
          assert(res[k] === true)
        }
        console.log('valid turner')
        return true
      })
      .catch(function (rej) {
        console.log('invalid turner')
        console.log(rej)
        return false
      })
  }

  var splitVowel = function (word) {
    var index = indexOfVowel(word)
    return [word.substring(0, index), word.substring(index)]
  }

  var indexOfVowel = function (word) {
    if (word.length > 1) {
      for (var i = 0; i < word.length; i++) {
        if (isVowel(word[i])) {
          return i
        }
      }
      return -1
    }
  }

  var isVowel = function (char) {
    if (char.length === 1) {
      for (var i = 0; i < vowels.length; i++) {
        if (vowels[i] === char) {
          return true
        }
      }
      return false
    }
  }

  var isWord = function (word, callback) {
    return new Promise(function (resolve, reject) {
      var url = wiktionaryUrl + querystring.escape(word)
      https.get(url, function (res) {
        var body = ''

        res.on('data', function (chunk) {
          body += chunk
        })

        res.on('end', function () {
          var jsonResponse = JSON.parse(body)
          console.log('Got a response: ', jsonResponse.query.pages)
          if (!jsonResponse.query.pages[-1]) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      }).on('error', function (err) {
        reject(err)
      })
    })
  }
}
