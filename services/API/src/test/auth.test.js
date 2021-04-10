'use strict'

const expect = require("chai").expect;
const sinon = require('sinon');
const mocks = require('./mocks');
const authCheck = require('../middlewares/isAuthenticated').authCheck;

describe('User authentication test',function(){

    it('Should authenticate Basic user', function() {
       const nextSpy = sinon.spy();
  
        authCheck(mocks.reqBasic, mocks.res, nextSpy);
        expect(nextSpy.called).to.be.true;
      });

      it('Should authenticate Premium user', function() {
        const nextSpy = sinon.spy();
  
        authCheck(mocks.reqPremium, mocks.res, nextSpy);
        expect(nextSpy.called).to.be.true;
      });

      it('Should handle empty authorization header', function() {
        const nextSpy = sinon.spy();
        
        authCheck(mocks.reqEmpty, mocks.res, nextSpy);
        expect(nextSpy.called).to.be.false;
      });

      it('Should handle invalid token', function() {
        const nextSpy = sinon.spy();
  
        authCheck(mocks.reqInvalidToken, mocks.res, nextSpy);
        expect(nextSpy.called).to.be.false;
      });
      
})