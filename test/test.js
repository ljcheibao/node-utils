"use strict";
var utils = require("../lib/core");
var expect = require("chai").expect;
describe('Array', function () {
  describe('#isArray()', function () {
    it('should be return true when the value is array', function () {
      expect(utils.isArray([1, 2])).to.be.equal(true);
    });
  });
});

describe('PlainObject', function () {
  describe('#isPlainObject()', function () {
    it('should be return true when the value is plainObject', function () {
      expect(utils.isPlainObject({name: "linjie"})).to.be.equal(true);
    });
    it('should be return false when the value is array', function () {
      expect(utils.isPlainObject([1, 2])).to.be.equal(false);
    });
  });
});