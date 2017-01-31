// turner_test
/* global describe, it */

var chai = require('chai')
var expect = chai.expect // we are using the "expect" style of Chai
var Turner = require('../lib/turner.js')

describe('Turner', function () {
  it('one valid turner', function () {
    var turner = new Turner()
    turner.validate('deine clique')
      .then(function (res) {
        expect(res).to.equal(true)
      })
      .catch(function (rej) {
        console.log(rej)
      })
  })
  it('another valid turner', function () {
    var turner = new Turner()
    turner.validate('Schatten Ränder')
      .then(function (res) {
        expect(res).to.equal(true)
      })
      .catch(function (rej) {
        console.log(rej)
      })
  })
  it('invalid turner', function () {
    var turner = new Turner()
    turner.validate('bein brecher')
      .then(function (res) {
        expect(res).to.equal(false)
      })
      .catch(function (rej) {
        console.log(rej)
      })
  })
  it('unsupported turner', function () {
    var turner = new Turner()
    turner.validate('weich im schädel')
      .then(function (res) {
        expect(res).to.equal(false)
      })
      .catch(function (rej) {
        console.log(rej)
      })
  })
})
